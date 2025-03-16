export class GenericFilterInterface {
    ip?: string
    user_id?: string;
    program_id?: string;
    org_id?: string;
    ward_id?: string;
    lga_id?: string;
    state_id?: string;
    geo_zone_id?: string;
    created_by?: string;
    order_by?: 'asc' | 'desc';
    search_term?: string;
    paginate?: boolean = false;
    page?: number;
    page_size?: number;
    from_date?: string | Date;
    to_date?: string | Date;
}