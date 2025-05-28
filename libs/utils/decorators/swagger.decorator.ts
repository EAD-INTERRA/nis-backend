import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiQuery, ApiOperation } from '@nestjs/swagger';

export function ApiCustomResponse(options: { summary: string, example: any, queries?: any[] }) {
  return applyDecorators(
    ApiOperation({ summary: options.summary }),
    ApiResponse({
      status: 200,
      description: 'Successful response',
      schema: {
        example: options.example,
      },
    }),
    // ApiQuery({ name: 'user_id', required: false, description: 'Filter by user ID' }),
    // ApiQuery({ name: 'org_id', required: false, description: 'Filter by organization ID' }),
    // ApiQuery({ name: 'state_id', required: false, description: 'Filter by state ID' }),
    // ApiQuery({ name: 'ip', required: false, description: 'Filter by IP address' }),
    // ApiQuery({ name: 'action', required: false, description: 'Filter by action' }),
    // ApiQuery({ name: 'search_term', required: false, description: 'Search term' }),
    // ApiQuery({ name: 'from_date', required: false, description: 'Filter from date' }),
    // ApiQuery({ name: 'to_date', required: false, description: 'Filter to date' }),
    // ApiQuery({ name: 'page', required: false, description: 'Page number' }),
    // ApiQuery({ name: 'page_size', required: false, description: 'Number per page' }),
    ...(options.queries || []).map(query => ApiQuery({name: query, required: false, description: `Filter by ${query}`})),
  );
}