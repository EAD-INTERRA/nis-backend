import { ReplicaDbService } from '@app/db/replica.service';
import { exception, notFound, ServiceResponse, success } from '@app/utils/response';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Account, Prisma } from '@prisma/replica/client';
import { CreateAccountDto } from '../dtos/create-account.dto';
import { UpdateAccountDto } from '../dtos/update-account.dto';
import { CreateAccountCustomDto } from '../dtos/create-accountcustom.dto';
import { UpdateAccountCustomDto } from '../dtos/update-accountcustom.dto';

@Injectable()
export class AccountService {
  constructor(private replicaService: ReplicaDbService) {}

  async createAccount(data: CreateAccountDto): Promise<ServiceResponse> {
    const prismaData: Prisma.AccountCreateInput = {
      ...data
    };
    try {
        const res = await this.replicaService.account.create({
          data: prismaData,
        });
        return success(res)
    } catch (err) {
        exception({ customMessage: "Unable to create account", message: err })
    }
  }

  async findAllAccounts(): Promise<ServiceResponse> {
    return success (this.replicaService.account.findMany({
      where: { deleted: false },
      include: {
        custom: true,
      },
    }))
  }

  async findAccount(id: string): Promise<ServiceResponse> {
    try {
        const found = await this.replicaService.account.findUnique({
          where: { id },
          include: {
            custom: true,
          },
        });
        if (!found || found.deleted) {
          notFound({customMessage: 'Account not found'});
        }
        return success(found);
    } catch (err) {
        exception({customMessage: "An error occured while fetching case", message: err})
    }
  }

  async updateAccount(id: string, data: UpdateAccountDto): Promise<ServiceResponse> {
    const existing = await this.findAccount(id); // Ensure it exists

    const prismaData: Prisma.AccountUpdateInput = {
      ...data
    };
    
    try {
        return success(this.replicaService.account.update({
          where: { id },
          data: prismaData,
        }))
    } catch (err) {
        exception({customMessage: "An error occured while updating account", message: err})
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
    return success (this.replicaService.accountCustom.findMany({
    }))
  }

  async findAccountCustom(id: string): Promise<ServiceResponse> {
    try {
        const found = await this.replicaService.accountCustom.findUnique({
          where: { id },
        });
        if (!found) {
          notFound({customMessage: 'Account custom not found'});
        }
        return success(found);
    } catch (err) {
        exception({customMessage: "An error occured while fetching case", message: err})
    }
  }

  async updateAccountCustom(id: string, data: UpdateAccountCustomDto): Promise<ServiceResponse> {
    const existing = await this.findAccount(id); // Ensure it exists

    const prismaData: Prisma.AccountCustomUpdateInput = {
      ...data
    };
    
    try {
        return success(this.replicaService.accountCustom.update({
          where: { id },
          data: prismaData,
        }))
    } catch (err) {
        exception({customMessage: "An error occured while updating account custom", message: err})
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
