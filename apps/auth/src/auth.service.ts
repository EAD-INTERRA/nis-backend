import { DbService } from '@app/db';
import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { badRequest, exception, forbidden, notFound, ServiceResponse, success } from '@app/utils/response';
import { EmailType } from '@app/utils/notification/types';
import { generateActivationToken, generateLoginOtp, generateResetToken, generateToken, hashPassword } from '@app/utils/helpers/utils';
import { sendEmail } from '@app/utils/notification/email';
import { notifyCoure, sendSMS } from '@app/utils/notification/sms';
import { ChangePasswordDto, CreateUserDto, LoginDto, OtpLoginDto, ResetPasswordDto } from './dto/auth.dto';
import { differenceInMinutes } from 'date-fns';
import { Prisma, Role, User, UserDetail } from '@prisma/client';


@Injectable()
export class AuthService {
  constructor(
    private dbService: DbService,
    private jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2
  ) { }

  getHello(arg: number): ServiceResponse {
    // try {
    const out = arg + 500
    if (+out) {
      return success(out)
    }
    else {
      badRequest({ message: "out", customMessage: "Wahala ti de" })
    }
    // } catch (err) {
    //   badRequest({ message: err.message, customMessage: err.stack })
    // }
  }

  private otpMsg(name: string, token: string): string {
    return `Hello ${name},

Your Login OTP is ${token}.

This token is valid for 30 minutes.

Regards, 
MedAdher.`
  }


  @OnEvent('loginToken.send', { async: true })
  private async sendLoginToken(email: string, message: string, subject: string, type: EmailType): Promise<void> {
    const user = await this.dbService.user.findUnique({
      where: {
        email
      },
      include: {
        details: true
      }
    })
    const loginToken = await generateLoginOtp()
    await sendEmail({
      sender: process.env.EMAIL_SENDER_EMAIL ?? 'no-reply@medadher.com',
      recipient: email,
      subject: subject,  // 
      message: message,
      recipientName: user.details.name,
      senderName: process.env.EMAIL_SENDER_NAME ?? 'MedAdher',
      type: type,
      token: loginToken.toString()
    })

    await sendSMS(
      [user.details.phone],
      this.otpMsg(user.details.name, loginToken.toString())
    )

    const editedUser = await this.dbService.user.update({
      where: {
        email
      },
      include: {
        details: true
      },
      data: {
        login_token: loginToken,
        login_token_sentAt: new Date()
      }
    })
  }

  @OnEvent('passwordReset.success', { async: true })
  private async sendEmail(email: string, message: string, subject: string, type: EmailType): Promise<void> {
    const user = await this.dbService.user.findUnique({
      where: {
        email
      },
      include: {
        details: true
      }
    })
    await sendEmail({
      sender: process.env.EMAIL_SENDER_EMAIL ?? 'no-reply@medadher.com',
      recipient: email,
      subject: subject,
      message: message,
      recipientName: user.details.name,
      senderName: process.env.EMAIL_SENDER_NAME ?? 'MedAdher',
      type: type,
      token: ""
    })
  }


  @OnEvent('resetPassword.send', { async: true })
  private async sendPasswordReset(token: string, email?: string, phone?: string): Promise<void> {
    const user = await this.dbService.user.findUnique({
      where: {
        email
      },
      include: {
        details: true
      }
    })

    if (phone) {
      const message = `Your password reset token is ${token}. This token will expire after 10 minutes.`
      await notifyCoure(phone, "", message)
    }

    if (email && email !== "") {
      await sendEmail({
        sender: process.env.EMAIL_SENDER_EMAIL ?? 'no-reply@medadher.com',
        recipient: email,
        subject: 'Change Password',  // 
        // `${process.env.DAT_PASSWORD_RESET_URL}?${password_token}`,
        message: `https://dat-auth.interranetworks.com/password-reset?${token}`,
        recipientName: user.details.name,
        senderName: process.env.EMAIL_SENDER_NAME ?? 'MedAdher',
        type: EmailType.change_password,
        token: token
      })
    }
  }

  async generateRefreshToken(userId: string): Promise<string> {
    const payload = { sub: userId };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    // Hash the refresh token before saving
    const hashedToken = await bcrypt.hash(refreshToken, 10);

    // Update the user with the new hashed token in the database
    await this.dbService.user.update({
      where: {
        id: userId
      },
      data: {
        refresh_token_hash: hashedToken,
        refresh_token_expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return refreshToken;
  }


  async validateRefreshToken(refreshToken: string): Promise<{ userId: string, refresh_token: string }> {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    const userId = payload.sub;

    // Retrieve the saved refresh token from the database
    const existingUser = await this.dbService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      throw new UnauthorizedException('Refresh token not found');
    }

    // Compare the provided token with the hashed token in the database
    const isValid = await bcrypt.compare(refreshToken, existingUser.refresh_token_hash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Check if the token is expired
    if (existingUser.refresh_token_expires_at < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    // Generate and save a new refresh token
    const refresh_token = await this.generateRefreshToken(existingUser.id);
    // Return the associated user or auth record
    return { userId: existingUser.id, refresh_token };
  }

  async revokeRefreshTokens(userId: string): Promise<void> {
    await this.dbService.user.update({
      where: { id: userId },
      data: {
        refresh_token_hash: null,
        refresh_token_expires_at: null
      }
    });
  }


  private async loginLogic(
    user: User & {
      details: UserDetail | null & {
        role: Role | null
      }
    },
    userToLogin: OtpLoginDto,
    jwtService: JwtService,
    ip?: any
  ): Promise<ServiceResponse> {
    // IF THE OTP IS ATTCHED TO THIS REQUEST, IT MEANS THAT THE USER EXISTS/IS VALIDATED
    const isExpired = differenceInMinutes(new Date().toISOString(), user.login_token_sentAt) > 30

    if (userToLogin.otp && isExpired) {
      this.eventEmitter.emit('loginToken.send', user.email, "", 'Login Token', EmailType.login_otp)
      badRequest({ customMessage: "Expired OTP. A new one has been sent to your email" })
    }

    if (userToLogin.otp && userToLogin.otp !== user.login_token) {
      badRequest({ customMessage: `Kindly verify your login using the OTP you recieved` })
    }

    const isMatch = userToLogin.otp ? true : await bcrypt.compare(userToLogin.password, user.password);
    // console.log(userToLogin.password, user.password)

    if (isMatch) {
      // const res = await usersService.getSingleUserDetails(user.id);
      const res = await this.dbService.user.findUnique({
        where: {
          id: user.id
        },
        include: {
          details: {
            include: {
              role: true
            }
          }
        }
      });
      const userDetails = res.details;

      // CHECK IF THE USER HAS ACTIVATED THEIR ACCOUNT
      if (!userDetails.is_active) {
        forbidden({ customMessage: "Kindly activate your account first" })
      }

      // CHECK IF THE USER REQUIRES AN OTP
      if (!user.details.is_super_admin) {
        const now = new Date()
        const tokenSentAt = user.login_token_sentAt
        const diff = differenceInMinutes(now, tokenSentAt)
        // if (diff < 5) {
        //   return badRequest("Too many requests", `Please wait for at least ${5 - diff} minute${5 - diff > 1 ? "s" : ""} before attempting to log in again`)
        // }

        // if (user.details.isOrgAdmin) {
        //   // const tokenSentAt = user.login_token_sentAt
        //   if (!userToLogin.otp) {
        //     if (diff < 5) {
        //       badRequest({
        //         message: "Too many requests",
        //         customMessage: `Please wait for at least ${5 - diff} minute${5 - diff > 1 ? "s" : ""} before attempting to log in again`
        //       })
        //     }
        //     this.eventEmitter.emit('loginToken.send', userToLogin.email, "", 'Login Token', EmailType.login_otp)
        //     return success("", "Login token sent successfully")
        //   }
        // } else if (!user.details.isOrgAdmin) {
        //   if (user.login_token && !userToLogin.otp && !isExpired) {
        //     return badRequest("Verify via OTP", `Kindly verify your login using the OTP you recieved`)
        //   }
        //   if (!user.login_token &&
        //     !isSameDay(now, tokenSentAt) &&
        //     !isSameDay(now, user.lastLogin)
        //   ) {
        //     this.eventEmitter.emit('loginToken.send', userToLogin.email, "", 'Login Token', EmailType.login_otp)
        //     return success("", "Login token sent successfully")
        //   }
        // }

      }

      // const { password, createdAt, updatedAt, id, activation_token, password_reset_token, passwordSalt, ...result } = user;
      const { id, user_id, phone, address, name, ...otherDetails } = userDetails;

      const jwtPayload = { sub: user.id, email: user.email, ...otherDetails };
      const access_token = await jwtService.signAsync(jwtPayload);
      const refresh_token = await this.generateRefreshToken(user.id)
      const decodedToken = jwtService.decode(access_token) as any;
      const expiresIn = decodedToken.exp;
      let userType;
      let userRole;
      let role = {};


      if (userDetails.role_id) {
        role = await this.dbService.role.findUnique({
          where: {
            id: userDetails.role_id
          }
        })
      }

      if (userDetails.is_super_admin) {
        userType = 'SUPERADMIN';
        userRole = 'admin';
      } else if (userDetails.role) {
        //   if (userDetails.isOrgAdmin) {
        //     userType = 'ORG';
        //     userRole = 'admin';
        //   } else if (userDetails.facilityId) {
        //     userType = 'FACILITY';
        //     userRole = 'user';
        //   } else {
        //     userType = 'ORG';
        //     userRole = 'user';
        //   }
        // } else if (userDetails.role?.partnerId) {
        //   userType = 'PARTNER';
        //   userRole = 'user';
        // } else if (userDetails.role?.donorId) {
        //   userType = 'DONOR';
        //   userRole = 'user';
        // } else {
        userType = 'PLEBIAN';
        userRole = 'plebian';
      }

      const updatedUser = await this.dbService.user.update({
        where: {
          id: user_id
        },
        data: {
          login_token: null,
          last_login: new Date().toISOString()
        }
      })

      // Log the Audit action
      // await this.auditService.logAction({
      //   actor: {
      //     userId: userId,
      //     ip
      //   },
      //   event: "LOGIN",
      //   entity: {
      //     id: userId,
      //     name: "USER",
      //     alias: `${name}`
      //   },
      //   time: updatedUser.lastLogin
      // })

      return success({
        access_token, refresh_token, userType, userRole,
        role, expiresIn,
        lastLogin: updatedUser.last_login
      });
    }
    badRequest({ customMessage: 'Invalid password' });
  }

  async login(userToLogin: LoginDto, ip?: any): Promise<ServiceResponse> {
    const user = await this.dbService.user.findFirst({
      where: {
        OR: [
          {
            details: {
              phone: userToLogin.phone
            }
          },
          {
            email: userToLogin.email
          }
        ]
      },
      include: {
        details: true
      }
    })
    if (!user) {
      notFound({ customMessage: "Invalid Credentials" });
    }
    return this.loginLogic(user, userToLogin, this.jwtService, ip);
  }


  async otpLogin(userToLoginOtp: OtpLoginDto): Promise<ServiceResponse> {
    const existingUser = await this.dbService.user.findUnique({
      where: {
        login_token: userToLoginOtp.otp
      }
    })
    if (!existingUser) {
      badRequest({ message: "Not Found", customMessage: "Invalid OTP" })
    }

    // const user = await this.usersService.findByEmail(existingUser.email, true);
    const user = await this.dbService.user.findUnique({
      where: {
        email: existingUser.email
      },
      include: {
        details: true
      }
    })

    const isExpired = differenceInMinutes(new Date().toISOString(), user.login_token_sentAt) > 30

    if (isExpired) {
      this.eventEmitter.emit('loginToken.send', existingUser.email, "", 'Login Token', EmailType.login_otp)
      badRequest({ customMessage: "Expired OTP. A new one has been sent to your email" })
    }

    return this.loginLogic(user, {
      email: existingUser.email,
      otp: userToLoginOtp.otp
    }, this.jwtService);
  }

  async resendLoginOtp(userToLoginOtp: OtpLoginDto): Promise<ServiceResponse> {
    const existingUser = await this.dbService.user.findUnique({
      where: {
        email: userToLoginOtp.email
      }
    })
    if (!existingUser) {
      badRequest({ message: "Not Found", customMessage: "Invalid Email" })
    }

    this.eventEmitter.emit('loginToken.send', existingUser.email, "", 'Login Token', EmailType.login_otp)
    return success("", "OTP Resent. A new OTP has been sent to your email")
  }

  async getPasswordResetToken(email: string): Promise<ServiceResponse> {
    const existingUser = await this.dbService.user.findFirst({
      where: {
        email
      }
    });
    if (!existingUser) {
      notFound({ message: "Not Found", customMessage: "User not found" });
    }
    const user = await this.dbService.user.update({
      where: {
        id: existingUser.id
      },
      data: {
        password_reset_token: await generateResetToken(),
        password_reset_token_sentAt: new Date()
      }
    })
    return success({ resetToken: user.password_reset_token })
  }

  async resetPassword(userToResetPassword: ResetPasswordDto): Promise<ServiceResponse> {
    let user;
    let userId;

    const existingUser = await this.dbService.user.findUnique({
      where: {
        email: userToResetPassword.email,
      }
    })

    if (existingUser) {
      // Check if token validity elapsed
      const now = new Date()
      const sentDateTime = existingUser.password_reset_token_sentAt
      const minutesDiff = differenceInMinutes(now, sentDateTime ?? 0)

      if (minutesDiff && (minutesDiff > 10)) {
        await this.dbService.user.update({
          where: {
            id: existingUser.id
          },
          data: {
            password_reset_token: null,
            password_reset_token_sentAt: null
          }
        })
        forbidden({ customMessage: "Invalid/Expired token" })
      }
    }

    user = await this.dbService.user.findFirst({
      where: {
        OR: [
          {
            details: {
              phone: userToResetPassword.phone
            }
          },
          {
            email: userToResetPassword.email
          }
        ]
      }
    })

    if (!user) {
      notFound({ customMessage: "User not found" });
    }

    // compare password reset tokens
    if (userToResetPassword.resetToken !== user.password_reset_token
      && userToResetPassword.resetToken !== user.user?.password_reset_token
    ) {
      badRequest({ customMessage: "Invalid reset token" });
    }

    const hashed = await hashPassword(userToResetPassword.newPassword)
    try {
      const res = await this.dbService.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashed,
          password_reset_token: null,
          password_reset_token_sentAt: null
        }
      })

      this.eventEmitter.emit('passwordReset.success', res.email, "", 'Password Reset Successful', EmailType.change_password_success)

      return success('', "Password reset successful")
    } catch (err) {
      exception({ customMessage: "An error occured" })
    }
  }

  async sendPasswordResetToken(body: { email?: string, phone?: string }): Promise<ServiceResponse> {
    const user = await this.dbService.user.findFirst({
      where: {
        OR: [
          {
            details: {
              phone: body.phone
            }
          },
          {
            email: body.email
          }
        ]
      }
    })
    if (!user) {
      notFound({ customMessage: "User not found" })
    }

    // GENERATE TOKEN (to be sent) AND UPDATE THE USER
    const updatedUser = await this.dbService.user.update({
      where: {
        id: user.id
      },
      data: {
        password_reset_token: await generateResetToken(),
        password_reset_token_sentAt: new Date()
      }
    })

    const password_token = updatedUser.password_reset_token

    try {
      this.eventEmitter.emit('resetPassword.send', password_token, body.email)
      return success(`Token sent successfully, check your ${body.email ? "email" : "phone"} to change password`)
    } catch (err) {
      badRequest({ customMessage: err })
    }

  }

  async verifyUserByPasswordResetToken(body: { token: string }): Promise<ServiceResponse> {
    const user = await this.dbService.user.findFirst({
      where: {
        password_reset_token: body.token
      }
    })
    if (!user) {
      badRequest({ customMessage: "Invalid token" })
    }
    return success("Token match successful")
  }


  async changePassword(userId: string, data: ChangePasswordDto): Promise<ServiceResponse> {
    try {
      const existingUser = await this.dbService.user.findUnique({
        where: {
          id: userId
        }
      })

      const isMatch = await bcrypt.compare(data.oldPassword, existingUser.password);
      if (!isMatch) {
        forbidden({ customMessage: "Invalid password" })
      }

      const hashed = await hashPassword(data.newPassword)

      const res = await this.dbService.user.update({
        where: {
          id: userId
        },
        data: {
          password: hashed
        }
      })

      return success("", "Password changed successfully")

    } catch (err) {
      exception({ message: err, customMessage: "An exceptuon occured" })
    }
  }


  async getProfile(userId: string): Promise<ServiceResponse> {
    try {
      const user = await this.dbService.user.findUnique({
        where: {
          id: userId
        },
        include: {
          details: true
        }
      })
      return success(user)
    } catch (err) {
      exception({ customMessage: err })
    }
  }


  async register(createUserDto: CreateUserDto): Promise<ServiceResponse> {
    const hashed = await hashPassword((await generateToken()).slice(0, 5))
    const resetToken = await generateResetToken();
    const activationToken = await generateActivationToken();

    const { name, gender, phone, address, ...createUserObj } = createUserDto

    // // Check the creator's organization/facility & restrict them to choose a role ONLY from roles in their org/facility
    // const creator = await this.dbService.userDetail.findUnique({
    //     where: {
    //         userId: createdBy
    //     }
    // });

    // if (!roleId) {
    //     return badRequest("", "Role ID cannot be ull")
    // }

    // const roleDetails = await this.getRoleById(roleId)

    // if (!creator.isSuperAdmin) {
    //     if ((creator.facilityId !== roleDetails.facilityId)
    //         && (creator.organizationId !== roleDetails.facilityId)
    //         && (creator.partnerId !== roleDetails.partnerId)
    //         && (creator.donorId !== roleDetails.donorId)) {
    //         return badRequest(ForbiddenException, 'Cannot use a role from another organization')
    //     }
    // }

    // // CHECK IF USER ALREADY EXISTS
    // const userExistsPhone = await this.findByPhone(phone)
    // const userExistsEmail = await this.findByEmail(createUserObj.email)
    // if (userExistsEmail) {
    //     return badRequest("", "User with this email exists")
    // }
    // if (userExistsPhone) {
    //     return badRequest("", "User with this phone exists")
    // }

    let createdUser: User;
    let userDetails: UserDetail;

    // try {
    createdUser = await this.dbService.user.create({
      data: {
        password: hashed,
        password_reset_token: resetToken,
        email: createUserObj.email,
        activation_token: activationToken
      },
    });

    console.log("CREATEDD: ", createdUser)


    // data.isOrgAdmin = isOrgAdmin
    // data.isFacilityAdmin = isFacilityAdmin
    // data.creator = { connect: { userId: createdBy } }
    // data.name = name
    // data.phone = phone,
    // data.address = createUserObj.address,
    // data.gender = GENDER[genderId]
    // data.user = { connect: { id: createdUser.id } }


    // If the user was created successfuly, create an entry in the UserDetail table
    if (createdUser) {
      let data: Prisma.UserDetailCreateInput = { user: { connect: { id: createdUser.id } }, is_super_admin: false, name, gender, phone, address };
      userDetails = await this.dbService.userDetail.create({
        data: data
      })

      if (userDetails) {
        const email = createdUser.email
        console.log('Email sending initiated');
        this.eventEmitter.emit('activationEmail.send', email, activationToken, 'Activation Token', EmailType.activate)

      }
      return success(await this.dbService.userDetail.findFirst({
        where: {
          id: userDetails.id
        },
        include: {
          role: true
        }
      }), "Account created successfully. Please check your email for the activation link")
    }

    // } catch (err) {
    //   if (createdUser) {
    //     // DELETE THE USER IF CREATED
    //     if (userDetails) {
    //       await this.dbService.UserDetail.delete({
    //         where: {
    //           user_id: userDetails.userId
    //         }
    //       })
    //     }
    //     await this.dbService.user.delete({
    //       where: {
    //         id: createdUser.id
    //       }
    //     })
    //   }
    //   exception({ message: err, customMessage: "An error occured while creating the user" })
    // }
  }

}
