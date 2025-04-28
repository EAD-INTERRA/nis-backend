import { ReplicaDbService } from '@app/db/replica.service';
import { badRequest, exception, forbidden, notFound, ServiceResponse, success } from '@app/utils/response';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Account, AccountCustom, Prisma } from '@prisma/replica/client';
import { CreateAccountDto } from '../dtos/create-account.dto';
import { UpdateAccountDto } from '../dtos/update-account.dto';
import { CreateAccountCustomDto } from '../dtos/create-accountcustom.dto';
import { UpdateAccountCustomDto } from '../dtos/update-accountcustom.dto';
import { differenceInYears } from 'date-fns';

@Injectable()
export class AccountService {
  constructor(private replicaService: ReplicaDbService) { }

  async createAccount(data: CreateAccountDto): Promise<ServiceResponse> {
    const { custom, ...rest } = data
    const prismaData: Prisma.AccountCreateInput = {
      ...rest,
      custom: {
        create: { ...custom },
      }
    };

    const existing = await this.replicaService.account.findUnique({
      where: { id_c: rest.id_c },
    });

    if (existing) {
      // If the case already exists, throw an error
      badRequest({ customMessage: 'Account with this CRM ID (id_c) already exists' });
    }

    // Check if account with the same passport number already exists
    if (custom) {
      const existing = await this.replicaService.accountCustom.findUnique({
        where: { passport_number_c: custom.passport_number_c },
      });
      if (existing) {
        badRequest({ customMessage: 'Account with this Passport Number already exists' });
      }
    }

    try {
      const res = await this.replicaService.account.create({
        data: prismaData,
        include: {
          custom: true,
        }
      });
      return success(res)
    } catch (err) {
      exception({ customMessage: "Unable to create account", message: err })
    }
  }

  async findAllAccounts(): Promise<ServiceResponse> {
    return success(await this.replicaService.account.findMany({
      where: { deleted: false },
      include: {
        custom: true,
      },
    }))
  }

  async findByIdC(id_c: string): Promise<ServiceResponse> {
    try {
      const found = await this.replicaService.account.findUnique({
        where: { id_c },
        include: {
          custom: true,
          cases: {
            // where: { deleted: false },
            include: {
              custom: true,
            }
          }
        }
      });
      if (!found) {
        notFound({ customMessage: 'Account not found' });
      }
      return success(found);
    } catch (err) {
      exception({ customMessage: "An error occured while fetching account", message: err })
    }
  }

  async findAccount(id: string, principal_passport_number?: string, internal: boolean = false): Promise<ServiceResponse> {
    try {
      let account: Account & { custom: AccountCustom } = null;

      // Step 1: Try to find the account by id or passport_number_c
      account = await this.replicaService.account.findFirst({
        where: {
          OR: [
            { id },
            { custom: { passport_number_c: id } },
          ]
        },
        include: { custom: true },
      });

      // Step 2: If no account or it's deleted, throw
      if (!account || account.deleted) {
        notFound({ customMessage: 'Account not found' });
      }

      // Step 3: If principal_passport_number is provided, check for matching case
      if (principal_passport_number) {
        const hasMatchingCase = await this.replicaService.case.findFirst({
          where: {
            account_id: account.id,
            custom: {
              principal_passport_number_c: principal_passport_number
            }
          }
        });

        if (!hasMatchingCase) {
          notFound({ customMessage: 'Account does not have matching principal passport number in any case' });
        }
      }

      const visaCase = await this.replicaService.case.findFirst({
        where: {
          account_id: account.id,
          deleted: false,
          // custom: {
          //   active_status_c: {
          //     in: ['active', 'approved', 'true']
          //   },
          // }
        },
        orderBy: {
          date_modified: 'desc',
        },
        include: {
          // account: {
          //   include: {
          //     custom: true,
          //   }
          // },
          custom: true,
        }
      })

      // if (!visaCase) {
      //   notFound({ customMessage: 'Visa case not found' });
      // }

      const age = differenceInYears(new Date(), account.custom.dob_c)

      if (age < 18) {
        if (!internal) {
          // If the call is not internal, we return a forbidden error
          forbidden({ customMessage: 'The passport holder is under 18 years old' });
        }
      }

      return success({ account, visaCase });
    } catch (err) {
      exception({ customMessage: "An error occured while fetching account", message: err })
    }
  }

  async updateAccount(id: string, data: UpdateAccountDto): Promise<ServiceResponse> {
    const existing = await this.findAccount(id, undefined, true); // Ensure it exists (specify that this is an internal call)
    const { custom, ...rest } = data

    const prismaData: Prisma.AccountUpdateInput = {
      ...rest,
      custom: {
        update: {
          ...custom,
        }
      }
    };

    // Check if account with the same passport number already exists
    // if (custom) {
    //   const existing = await this.replicaService.accountCustom.findUnique({
    //     where: { passport_number_c: custom.passport_number_c },
    //   });
    //   if (existing) {
    //     badRequest({customMessage: 'Account with this Passport Number already exists'});
    //   }
    // }

    try {
      return success(await this.replicaService.account.update({
        where: { id: existing.body.account.id },
        data: prismaData,
        include: {
          custom: true,
        }
      }))
    } catch (err) {
      exception({ customMessage: "An error occured while updating account", message: err })
    }
  }

  async createAccountCustom(data: CreateAccountCustomDto): Promise<ServiceResponse> {
    const prismaData: Prisma.AccountCustomCreateInput = {
      ...data
    };
    try {
      const res = await this.replicaService.accountCustom.create({
        data: prismaData,
      });
      return success(res)
    } catch (err) {
      exception({ customMessage: "Unable to create account", message: err })
    }
  }

  async findAllAccountsCustom(): Promise<ServiceResponse> {
    return success(await this.replicaService.accountCustom.findMany({
    }))
  }

  async findAccountCustom(id: string): Promise<ServiceResponse> {
    try {
      const found = await this.replicaService.accountCustom.findUnique({
        where: { id },
      });
      if (!found) {
        notFound({ customMessage: 'Account custom not found' });
      }
      return success(found);
    } catch (err) {
      exception({ customMessage: "An error occured while fetching case", message: err })
    }
  }

  async updateAccountCustom(id: string, data: UpdateAccountCustomDto): Promise<ServiceResponse> {
    const existing = await this.findAccount(id); // Ensure it exists

    const prismaData: Prisma.AccountCustomUpdateInput = {
      ...data
    };

    try {
      return success(await this.replicaService.accountCustom.update({
        where: { id },
        data: prismaData,
      }))
    } catch (err) {
      exception({ customMessage: "An error occured while updating account custom", message: err })
    }
  }

  //   async remove(id: string): Promise<Case> {
  //     await this.findOne(id); // Ensure it exists
  //     return this.replicaService.case.update({
  //       where: { id },
  //       data: { deleted: true },
  //     });
  //   }
}
