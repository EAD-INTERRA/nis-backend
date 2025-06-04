import { CoreDbService } from '@app/db';
import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { badRequest, exception, forbidden, notFound, ServiceResponse, success, unauthorized } from '@app/utils/response';
import { EmailType } from '@app/utils/notification/types';
import { generateActivationToken, generateLoginOtp, generateResetToken, generateToken, hashPassword } from '@app/utils/helpers/utils';
import { sendEmail } from '@app/utils/notification/email';
import { notifyCoure, sendSMS } from '@app/utils/notification/sms';
import { ActivateAccountDto, ChangePasswordDto, CreateUserDto, ForgotPasswordDto, LoginDto, OtpLoginDto, ResetPasswordDto } from './dto/auth.dto';
import { differenceInHours, differenceInMinutes } from 'date-fns';
import { Prisma, Role, User, UserDetail } from '@prisma/core/client';


@Injectable()
export class AuthService {
  constructor(
    private dbService: CoreDbService,
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
  }

  @OnEvent('activationEmail.send', { async: true })
  private async sendActivationEmail(email: string, token: string, subject: string, type: EmailType): Promise<void> {
    const user = await this.dbService.user.findUnique({
      where: {
        email
      },
      include: {
        details: true
      }
    })
    await sendEmail({
      sender: 'no-reply@nis.com',
      recipient: email,
      subject: subject,
      message: `${process.env.DAT_AUTH_URL}?token=${token}`,
      recipientName: `${user.details.first_name} ${user.details.surname}`,
      senderName: 'NIS',
      type: type,
      token: token
    })
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
      sender: process.env.EMAIL_SENDER_EMAIL ?? 'no-reply@nis.com',
      recipient: email,
      subject: subject,  // 
      message: message,
      recipientName: `${user.details.first_name} ${user.details.surname}`,
      senderName: process.env.EMAIL_SENDER_NAME ?? 'NIS',
      type: type,
      token: loginToken.toString()
    })

    await sendSMS(
      [user.details.phone],
      this.otpMsg(`${user.details.first_name} ${user.details.surname}`, loginToken.toString())
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
  private async sendResetEmail(email: string, message: string, subject: string, type: EmailType): Promise<void> {
    const user = await this.dbService.user.findUnique({
      where: {
        email
      },
      include: {
        details: true
      }
    })
    await sendEmail({
      sender: process.env.EMAIL_SENDER_EMAIL ?? 'no-reply@nis.com',
      recipient: email,
      subject: subject,
      message: message,
      recipientName: `${user.details.first_name} ${user.details.surname}`,
      senderName: process.env.EMAIL_SENDER_NAME ?? 'NIS',
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
        sender: process.env.EMAIL_SENDER_EMAIL ?? 'no-reply@nis.com',
        recipient: email,
        subject: 'Password Reset',  // 
        // `${process.env.DAT_PASSWORD_RESET_URL}?${password_token}`,
        message: `${token}`,
        recipientName: `${user.details.first_name} ${user.details.surname}`,
        senderName: process.env.EMAIL_SENDER_NAME ?? 'NIS',
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
    try {
      const isMatch = userToLogin.otp ? true : await bcrypt.compare(userToLogin.password, user.password);
      console.log(userToLogin.password, user.password, isMatch)

      if (!isMatch) {
        unauthorized({ customMessage: "Invalid Password" })
      }

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
      // if (!user.details.is_super_admin) {    
        const { id, user_id, phone, address, first_name, middle_name, surname, ...otherDetails } = userDetails;

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

        return success({
          access_token, refresh_token, userType, userRole,
          role, expiresIn,
          lastLogin: updatedUser.last_login
        });
      // }
    } catch (e) {
      exception({ customMessage: 'an error occured', message: e });
    }
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

    if (userToLoginOtp.otp && userToLoginOtp.otp !== user.login_token) {
      badRequest({ customMessage: `Kindly verify your login using the OTP you recieved` })
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
    const existingUser = await this.dbService.user.findUnique({
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
    let user: User & { details?: UserDetail };
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
    if (userToResetPassword.resetToken !== user.password_reset_token) {
      badRequest({ customMessage: "Invalid reset token" });
    }

    const hashed = await hashPassword(userToResetPassword.newPassword)

    try {
      const res = await this.dbService.user.update({
        where: {
          id: user.id,
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

  async sendPasswordResetToken(body: ForgotPasswordDto): Promise<ServiceResponse> {
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

  async verifyUserByPasswordResetToken(body: { token: number }): Promise<ServiceResponse> {
    const user = await this.dbService.user.findUnique({
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
        select: {
          id: true,
          email: true,
          last_login: true,
          details: true
        }
      })
      return success(user)
    } catch (err) {
      exception({ customMessage: err })
    }
  }


  async register(createUserDto: CreateUserDto): Promise<ServiceResponse> {
    const { email, phone, password, ...createUserObj } = createUserDto

    let hashed: string;

    if (password) {
      hashed = await hashPassword(password)
    } else {
      hashed = await hashPassword((await generateToken()).slice(0, 5)) // Auto-generate password
    }

    const resetToken = await generateResetToken();
    const activationToken = await generateActivationToken();

    // // CHECK IF USER ALREADY EXISTS
    const userExistsEmail = await this.dbService.user.findUnique({
      where: {
        email
      }
    })
    if (userExistsEmail) {
      badRequest({ message: "", customMessage: "User with this email exists}" })
    }
    const userExistsPhone = await this.dbService.userDetail.findUnique({
      where: {
        phone
      }
    })
    if (userExistsPhone) {
      badRequest({ message: "", customMessage: "User with this phone exists" })
    }

    const createdUser = await this.dbService.user.create({
      data: {
        password: hashed,
        password_reset_token: resetToken,
        email,
        activation_token: activationToken,
        details: {
          create: {
            is_super_admin: false,
            phone,
            ...createUserObj,
          }
        }
      },
    });

    console.log("CREATED: ", createdUser)

    // If the user was created successfuly, send activation email
    if (createdUser) {
      const email = createdUser.email
      console.log('Email sending initiated');
      this.eventEmitter.emit('activationEmail.send', email, activationToken, 'Activation Token', EmailType.activate)

      return success(await this.dbService.userDetail.findUnique({
        where: {
          user_id: createdUser.id
        },
        include: {
          role: true,
        }
      }), "Account created successfully. Please check your email for the activation link")
    }
  }


  async activateAccount(data: ActivateAccountDto): Promise<ServiceResponse> {
    const { userId, token } = data
    // ID based activation
    if (userId) {
      const user = await this.dbService.user.findUnique({
        where: {
          id: userId
        },
        include: {
          details: true
        }
      })
      if (user) {
        if (user.details.is_active) {
          forbidden({ customMessage: "Account already active" })
        }
      }

      const activatedUser = await this.dbService.userDetail.update({
        where: {
          user_id: user.id
        },
        data: {
          is_active: true
        }
      })
      if (activatedUser.is_active) {
        await this.dbService.user.update({
          where: {
            id: user.id
          },
          data: {
            activation_token: null,
            activation_token_sentAt: null,
            password_reset_token: await generateResetToken(),
            password_reset_token_sentAt: new Date()
          }
        })
        this.eventEmitter.emit('activationEmail.send', user.email, "", 'Activation Success', EmailType.activation_success)
        return success("", "User activated successfully")
      }
      badRequest({ message: activatedUser, customMessage: "Unable to activate user" })
    }

    // Token based activation
    const user = await this.dbService.user.findUnique({
      where: {
        activation_token: token
      },
      include: {
        details: true
      }
    })
    if (user) {
      if (user.details.is_active) {
        forbidden({ customMessage: "Account already active" })
      }

      // Check if token validity elapsed
      const now = new Date()
      const sentDateTime = user.activation_token_sentAt
      const hourDiff = differenceInHours(now, sentDateTime ?? 0)

      if (hourDiff && (hourDiff > 12)) {
        await this.dbService.user.update({
          where: {
            id: user.id
          },
          data: {
            activation_token: null,
            activation_token_sentAt: null
          }
        })
        forbidden({ customMessage: "Invalid/Expired token" })
      }

      const activatedUser = await this.dbService.userDetail.update({
        where: {
          user_id: user.id
        },
        data: {
          is_active: true
        }
      })
      // this.eventEmitter.emit('activationToken.send', user.id)
      if (activatedUser) {
        const updatedUser = await this.dbService.user.update({
          where: {
            id: user.id
          },
          data: {
            activation_token: null,
            activation_token_sentAt: null,
            password_reset_token: await generateResetToken(),
            password_reset_token_sentAt: new Date()
          }
        })
        let body = { email: updatedUser.email, 'password_reset_token': updatedUser.password_reset_token }
        this.eventEmitter.emit('activationEmail.send', updatedUser.email, "", 'Activation Success', EmailType.activation_success)

        return success(body, 'Account activated sucessfully!')
      }
    }
    unauthorized({ customMessage: 'Token expired or does not exist!' })
  }

}
