import { paginate, PaginatedData } from "./utils";

interface FindArgs<T> {
  where?: Partial<Record<keyof T, any>>;
  select?: Partial<Record<keyof T, any>>;
  orderBy?: Partial<Record<keyof T, 'asc' | 'desc'>>;
}

interface PaginatedPrismaQuery<T> {
  // model: any,
  model: {
    findMany: (args: any) => Promise<T[]>;
    count: (args: any) => Promise<number>;
  };
  findArgs: FindArgs<T>,
  page: number,
  page_size: number
}

export function buildObject<T extends Record<string, any>>(input: T): Partial<T> {
  const output: Partial<T> = {};
  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined && value !== null && value !== '') {
      output[key as keyof T] = value;
    }
  }
  return output;
}


/**
 * Paginates a Prisma query.
 * @param query The query to paginate.
 * @returns The paginated data.
 */
export async function paginateQuery<T>(
  query: PaginatedPrismaQuery<T>
): Promise<PaginatedData<T>> {

  const { model, findArgs, page, page_size } = query

  const size = page_size || 10; // Default page size if not provided
  const currentPage = page || 1; // Default to page 1 if not provided

  const [data, total_count] = await Promise.all([
    model.findMany({
      ...findArgs,
      skip: (currentPage - 1) * size || 0,
      take: size || 10,
      orderBy: findArgs.orderBy || { created_at: 'desc' }, // Default order by created_at if not provided
    }),
    model.count({
      where: findArgs.where // To build the Count() query properly
    }),
  ]);

  return paginate<T>({ page: currentPage, page_size: size, total_count, data });
}
