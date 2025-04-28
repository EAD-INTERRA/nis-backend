import { ReplicaDbService } from '@app/db/replica.service';
import { badRequest, exception, notFound, ServiceResponse, success } from '@app/utils/response';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Account, AccountCustom, Case, Prisma } from '@prisma/replica/client';
import { CreateCaseDto } from '../dtos/create-case.dto';
import { UpdateCaseDto } from '../dtos/update-case.dto';
import { CreateCaseCustomDto } from '../dtos/create-casecustom.dto';
import { UpdateCaseCustomDto } from '../dtos/update-casecustom.dto';
import { CaseFilterInterface } from '../interfaces';

@Injectable()
export class CaseService {
  constructor(private replicaService: ReplicaDbService) { }

  async createCase(data: CreateCaseDto): Promise<ServiceResponse> {
    const { custom, passport_number, visa_document, ...rest } = data;

    try {
      let existingAccount: Account & { custom: AccountCustom } = null;

      const existing = await this.replicaService.case.findUnique({
        where: { id_c: rest.id_c },
      });

      if (existing) {
        // If the case already exists, throw an error
        badRequest({ customMessage: 'Case with this CRM ID (id_c) already exists' });
      }

      if (passport_number) {
        existingAccount = await this.replicaService.account.findFirst({
          where: {
            custom: {
              passport_number_c: passport_number,
            },
          },
          include: {
            custom: true,
          },
        });
      }

      if (!existingAccount) {
        // If no existing account, throw an error
        notFound({ customMessage: 'Account with this Passport Number does not exist' });
      }
      // const accountId = existingAccount ? existingAccount.id : account_id;

      let prismaData: Prisma.CaseCreateInput = {
        ...rest,
        ...(existingAccount && {
          account: {
            connect: {
              id: existingAccount.id,
            },
          },
        }),
        ...(custom && {
          custom: {
            create: { ...custom },
          },
        }),
      };

      // Step 1: Create the Case
      const createdCase = await this.replicaService.case.create({
        data: prismaData,
      });

      // Step 2: Create the VisaDocument linked to that Case (if needed)
      if (visa_document) {
        const { custom: visaCustom, ...restVisa } = visa_document;

        await this.replicaService.visaDocument.create({
          data: {
            ...restVisa,
            case_id: createdCase.id,
            ...(visaCustom && {
              custom: {
                create: { ...visaCustom },
              },
            }),
          },
        });
      }

      return success(await this.replicaService.case.findUnique({
        where: {
          id: createdCase.id,
        },
        include: {
          custom: true,
          account: true,
          visa_document: {
            include: {
              custom: true,
            }
          },
        },
      }));
    } catch (err) {
      exception({ customMessage: "Unable to create case", message: err });
    }
  }


  async findAllCases(filters?: CaseFilterInterface): Promise<ServiceResponse> {

    const { passport_number, active_status_c, account_id, page, page_size, ...rest } = filters;

    let where: Prisma.CaseWhereInput = {
      ...rest,
      deleted: false,
    }

    console.log('filters', filters)
    
    if (account_id) {
      where.account = {
        id: account_id,
      }
    }
   
    if (passport_number) {
      where.account = {
        custom: {
          passport_number_c: passport_number,
        }
      }
    }
    
    if (active_status_c) {
      where.custom = {
        active_status_c: active_status_c,
      }
    }
    console.log('where', where)
    
    const res = await this.replicaService.case.findMany({
      where,
      include: {
        custom: true,
        account: true,
      },
      orderBy: {
        date_modified: 'desc',
      },
      take: page_size,
      skip: (page - 1) * page_size,
    })
    
    return success(res);
  }

  async findByIdC(id_c: string): Promise<ServiceResponse> {
    try {
      const found = await this.replicaService.case.findUnique({
        where: { id_c },
        include: {
          custom: true,
          account: true,
          visa_document: true
        }
      });
      if (!found) {
        notFound({ customMessage: 'Case not found' });
      }
      return success(found);
    } catch (err) {
      exception({ customMessage: "An error occured while fetching acccaseount", message: err })
    }
  }

  async findCase(id: string): Promise<ServiceResponse> {
    try {
      const found = await this.replicaService.case.findUnique({
        where: { id },
        include: {
          custom: true,
          account: true,
          visa_document: true
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
    const { custom, passport_number, visa_document, ...rest } = data;

    // Check if account with the same passport number already exists
    let existingAccount: (Account & { custom: AccountCustom }) | null = null;
    if (passport_number) {
      existingAccount = await this.replicaService.account.findFirst({
        where: {
          custom: {
            passport_number_c: passport_number,
          }
        },
        include: {
          custom: true,
        }
      });
    }

    const prismaData: Prisma.CaseUpdateInput = {
      ...rest
    };

    // Handle account update if needed
    if (existingAccount) {
      prismaData.account = {
        connect: {
          id: existingAccount.id,
        }
      };
    }

    // Handle custom update if needed
    if (custom) {
      prismaData.custom = {
        update: { ...custom }
      };
    }

    // Step 1: Handle VisaDocument update or creation (if visa_document exists in input)
    if (visa_document) {
      const { custom: visaCustom, case_id, ...restVisa } = visa_document;

      if (existing.body.visa_document) {
        // If a VisaDocument exists, update it
        await this.replicaService.visaDocument.update({
          where: {
            id: existing.body.visa_document.id
          },
          data: {
            ...restVisa,
            ...(visaCustom && {
              custom: {
                update: { ...visaCustom }
              }
            }),
          },
        });
      } else {
        // If no existing VisaDocument, create one and link to Case
        await this.replicaService.visaDocument.create({
          data: {
            ...restVisa,
            case_id: id, // Link to the current case by its id
            ...(visaCustom && {
              custom: {
                create: { ...visaCustom }
              }
            })
          },
        });
      }
    }

    try {
      // Update the Case with all necessary data
      const updatedCase = await this.replicaService.case.update({
        where: { id },
        data: prismaData,
        include: {
          custom: true,
          account: {
            include: {
              custom: true,
            }
          },
          visa_document: {
            include: {
              custom: true,
            }
          },
        }
      });

      return success(updatedCase);
    } catch (err) {
      exception({ customMessage: "An error occurred while updating case", message: err });
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
