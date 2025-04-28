export class CaseFilterInterface {
    account_id?: string;
    type?: string;
    assigned_user_id?: string;
    date_entered?: string;
    date_modified?: string;
    created_by?: string;
    case_number?: string;

    // CaseCustom model
    passport_number?: string;
    active_status_c?: CaseStatusEnum;   // Active | Inactive

    page?: number = 1;
    page_size?: number = 10;

    // Static method to return keys
    static getKeys(): string[] {
        return [
            'account_id',
            'type',
            'assigned_user_id',
            'date_entered',
            'date_modified',
            'created_by',
            'case_number',
            'passport_number',
            'active_status_c',
            'page',
            'page_size',
        ];
    }
}

export enum CaseStatusEnum {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive',
}