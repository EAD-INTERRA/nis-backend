import { ReplicaDbService } from '@app/db/replica.service';
import { exception, notFound, ServiceResponse, success } from '@app/utils/response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReplicaService {
    constructor(private replicaDbService: ReplicaDbService) { }

    async getApplicantBioData(passport_number: string): Promise<ServiceResponse> {
        try {
            const account = await this.replicaDbService.accountCustom.findUnique({
                where: {
                    passport_number_c: passport_number,
                },
                include: {
                    account: true,
                }
            });
            if (!account) {
                notFound({ customMessage: 'Applicant not found' });
            }
            const cases = await this.replicaDbService.case.findMany({
                where: {
                    account_id: account.id,
                    deleted: false,
                }, 
                orderBy: {
                    date_modified: 'desc',
                }
            })
            return success(account);
        } catch (err) {
            exception({ customMessage: 'Unable to fetch applicant bio data', message: err });
        }
    }
}