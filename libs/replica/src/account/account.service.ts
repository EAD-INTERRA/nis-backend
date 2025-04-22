import { ReplicaDbService } from '@app/db/replica.service';
import { exception, notFound, ServiceResponse, success } from '@app/utils/response';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Account, Prisma } from '@prisma/replica/client';

@Injectable()
export class AccountService {
  constructor(private replicaService: ReplicaDbService) {}

  async createAccount(data: Prisma.AccountCreateInput): Promise<ServiceResponse> {
    try {
        const res = await this.replicaService.account.create({
          data,
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

  async updateAccount(id: string, data: Prisma.AccountUpdateInput): Promise<ServiceResponse> {
    const existing = await this.findAccount(id); // Ensure it exists
    
    try {
        return success(this.replicaService.account.update({
          where: { id },
          data,
        }))
    } catch (err) {
        exception({customMessage: "An error occured while updating account", message: err})
    }
  }

  async createAccountCustom(data: Prisma.AccountCustomCreateInput): Promise<ServiceResponse> {
    try {
        const res = await this.replicaService.accountCustom.create({
          data,
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

  async updateAccountCustom(id: string, data: Prisma.AccountCustomUpdateInput): Promise<ServiceResponse> {
    const existing = await this.findAccount(id); // Ensure it exists
    
    try {
        return success(this.replicaService.accountCustom.update({
          where: { id },
          data,
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
