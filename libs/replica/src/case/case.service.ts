import { ReplicaDbService } from '@app/db/replica.service';
import { exception, notFound, ServiceResponse, success } from '@app/utils/response';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Case, Prisma } from '@prisma/replica/client';
import { CreateCaseDto } from '../dtos/create-case.dto';
import { UpdateCaseDto } from '../dtos/update-case.dto';
import { CreateCaseCustomDto } from '../dtos/create-casecustom.dto';
import { UpdateCaseCustomDto } from '../dtos/update-casecustom.dto';

@Injectable()
export class CaseService {
  constructor(private replicaService: ReplicaDbService) { }

  async createCase(data: CreateCaseDto): Promise<ServiceResponse> {
    const { custom, ...rest } = data
    const prismaData: Prisma.CaseCreateInput = {
      ...rest,
      custom: {
        create: {...custom},
      }
    };

    try {
      const res = await this.replicaService.case.create({
        data: prismaData,
      });
      return success(res)
    } catch (err) {
      exception({ customMessage: "Unable to create case", message: err })
    }
  }

  async findAllCases(): Promise<ServiceResponse> {
    return success(await this.replicaService.case.findMany({
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
        notFound({ customMessage: 'Case not found' });
      }
      return success(found);
    } catch (err) {
      exception({ customMessage: "An error occured while fetching case", message: err })
    }
  }

  async updateCase(id: string, data: UpdateCaseDto): Promise<ServiceResponse> {
    const existing = await this.findCase(id); // Ensure it exists
    const { custom, ...rest } = data

    const prismaData: Prisma.CaseUpdateInput = {
      ...rest,
      custom: {
        update: {
          ...custom,
        }
      }
    };

    try {
      return success(await this.replicaService.case.update({
        where: { id },
        data: prismaData,
        include: {
          custom: true,
        }
      }))
    } catch (err) {
      exception({ customMessage: "An error occured while updating case", message: err })
    }
  }

  async createCaseCustom(data: CreateCaseCustomDto): Promise<ServiceResponse> {
    const prismaData: Prisma.CaseCustomCreateInput = {
      ...data
    };

    try {
      const res = await this.replicaService.caseCustom.create({
        data: prismaData,
      });
      return success(res)
    } catch (err) {
      exception({ customMessage: "Unable to create custom case", message: err })
    }
  }

  async findAllCustomCases(): Promise<ServiceResponse> {
    return success(await this.replicaService.caseCustom.findMany({
    }))
  }

  async findCustomCase(id: string): Promise<ServiceResponse> {
    try {
      const found = await this.replicaService.caseCustom.findUnique({
        where: { id },
      });
      if (!found) {
        notFound({ customMessage: 'Custom case not found' });
      }
      return success(found);
    } catch (err) {
      exception({ customMessage: "An error occured while fetching case", message: err })
    }
  }

  async updateCustomCase(id: string, data: UpdateCaseCustomDto): Promise<ServiceResponse> {
    const existing = await this.findCustomCase(id); // Ensure it exists

    const prismaData: Prisma.CaseCustomUpdateInput = {
      ...data
    };


    try {
      return success(await this.replicaService.caseCustom.update({
        where: { id },
        data: prismaData,
      }))
    } catch (err) {
      exception({ customMessage: "An error occured while updating custom case", message: err })
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
