import { ReplicaDbService } from '@app/db/replica.service';
import { exception, notFound, ServiceResponse, success } from '@app/utils/response';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Case, Prisma } from '@prisma/replica/client';

@Injectable()
export class CaseService {
  constructor(private replicaService: ReplicaDbService) {}

  async createCase(data: Prisma.CaseCreateInput): Promise<ServiceResponse> {
    try {
        const res = await this.replicaService.case.create({
          data,
        });
        return success(res)
    } catch (err) {
        exception({ customMessage: "Unable to create case", message: err })
    }
  }

  async findAllCases(): Promise<ServiceResponse> {
    return success (this.replicaService.case.findMany({
      where: { deleted: false },
      include: {
        custom: true,
        account: true,
      },
    }))
  }

  async findCase(id: string): Promise<ServiceResponse> {
    try {
        const found = await this.replicaService.case.findUnique({
          where: { id },
          include: {
            custom: true,
            account: true,
          },
        });
        if (!found || found.deleted) {
          notFound({customMessage: 'Case not found'});
        }
        return success(found);
    } catch (err) {
        exception({customMessage: "An error occured while fetching case", message: err})
    }
  }

  async updateCase(id: string, data: Prisma.CaseUpdateInput): Promise<ServiceResponse> {
    const existing = await this.findCase(id); // Ensure it exists
    
    try {
        return success(this.replicaService.case.update({
          where: { id },
          data,
        }))
    } catch (err) {
        exception({customMessage: "An error occured while updating case", message: err})
    }
  }

  async createCaseCustom(data: Prisma.CaseCustomCreateInput): Promise<ServiceResponse> {
    try {
        const res = await this.replicaService.caseCustom.create({
          data,
        });
        return success(res)
    } catch (err) {
        exception({ customMessage: "Unable to create custom case", message: err })
    }
  }

  async findAllCustomCases(): Promise<ServiceResponse> {
    return success (this.replicaService.caseCustom.findMany({
    }))
  }

  async findCustomCase(id: string): Promise<ServiceResponse> {
    try {
        const found = await this.replicaService.caseCustom.findUnique({
          where: { id },
        });
        if (!found) {
          notFound({customMessage: 'Custom case not found'});
        }
        return success(found);
    } catch (err) {
        exception({customMessage: "An error occured while fetching case", message: err})
    }
  }

  async updateCustomCase(id: string, data: Prisma.CaseCustomUpdateInput): Promise<ServiceResponse> {
    const existing = await this.findCustomCase(id); // Ensure it exists
    
    try {
        return success(this.replicaService.caseCustom.update({
          where: { id },
          data,
        }))
    } catch (err) {
        exception({customMessage: "An error occured while updating custom case", message: err})
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
