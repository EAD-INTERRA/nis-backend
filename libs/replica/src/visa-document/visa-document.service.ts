import { ReplicaDbService } from '@app/db/replica.service';
import { exception, notFound, ServiceResponse, success } from '@app/utils/response';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Case, Prisma } from '@prisma/replica/client';

@Injectable()
export class VisaDocumentService {
  constructor(private replicaService: ReplicaDbService) {}

  async createVisaDocument(data: Prisma.VisaDocumentCreateInput): Promise<ServiceResponse> {
    try {
        const res = await this.replicaService.visaDocument.create({
          data,
        });
        return success(res)
    } catch (err) {
        exception({ customMessage: "Unable to create visa document", message: err })
    }
  }

  async findAllVisaDocuments(): Promise<ServiceResponse> {
    return success (this.replicaService.visaDocument.findMany({
      where: { deleted: false },
      include: {
        custom: true,
      },
    }))
  }

  async findVisaDocument(id: string): Promise<ServiceResponse> {
    try {
        const found = await this.replicaService.visaDocument.findUnique({
          where: { id },
          include: {
            custom: true,
          },
        });
        if (!found || found.deleted) {
          notFound({customMessage: 'Visa Document not found'});
        }
        return success(found);
    } catch (err) {
        exception({customMessage: "An error occured while fetching visa document", message: err})
    }
  }

  async updateVisaDocument(id: string, data: Prisma.VisaDocumentUpdateInput): Promise<ServiceResponse> {
    const existing = await this.findVisaDocument(id); // Ensure it exists
    
    try {
        return success(this.replicaService.visaDocument.update({
          where: { id },
          data,
        }))
    } catch (err) {
        exception({customMessage: "An error occured while updating visa document", message: err})
    }
  }

  async createVisaDocumentCustom(data: Prisma.VisaDocumentCustomCreateInput): Promise<ServiceResponse> {
    try {
        const res = await this.replicaService.visaDocumentCustom.create({
          data,
        });
        return success(res)
    } catch (err) {
        exception({ customMessage: "Unable to create custom visa document", message: err })
    }
  }

  async findAllCustomVisaDocuments(): Promise<ServiceResponse> {
    return success (this.replicaService.visaDocumentCustom.findMany({
    }))
  }

  async findCustomVisaDocument(id: string): Promise<ServiceResponse> {
    try {
        const found = await this.replicaService.visaDocumentCustom.findUnique({
          where: { id },
        });
        if (!found) {
          notFound({customMessage: 'Custom visa document not found'});
        }
        return success(found);
    } catch (err) {
        exception({customMessage: "An error occured while fetching case", message: err})
    }
  }

  async updateCustomVisaDocument(id: string, data: Prisma.VisaDocumentCustomUpdateInput): Promise<ServiceResponse> {
    const existing = await this.findCustomVisaDocument(id); // Ensure it exists
    
    try {
        return success(this.replicaService.visaDocumentCustom.update({
          where: { id },
          data,
        }))
    } catch (err) {
        exception({customMessage: "An error occured while updating custom visa document ", message: err})
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
