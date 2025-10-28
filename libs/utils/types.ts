import { ApiProperty } from '@nestjs/swagger';

export class PaginationFilter {
  page?: number;
  page_size?: number;
}

export class PaginationMeta {
  @ApiProperty() page: number;
  @ApiProperty() page_size: number;
  @ApiProperty() total_items: number;
  @ApiProperty() total_pages: number;
}

export class Paginated<T> {
  @ApiProperty({ type: () => PaginationMeta })
  meta: PaginationMeta;

  @ApiProperty({ isArray: true })
  body: T[];
}

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


export const USER_SELECT = {
  id: true,
  email: true,
  created_at: true,
  last_login: true,
  details: {
    select: {
      first_name: true,
      middle_name: true,
      surname: true,
      is_active: true,
      passport_records: true,
      phone: true,
      creator: {
        select: {
          user_id: true,
          first_name: true,
          middle_name: true,
          surname: true,
        },
      },
      role: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
} as const;