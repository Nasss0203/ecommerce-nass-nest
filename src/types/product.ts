import { IQuery } from 'src/interfaces';
import { LeanDocument } from 'src/utils';

interface FindOptions<T> {
  filter?: Partial<T>;
  select?: string[];
  sort?: Record<string, 1 | -1>;
  page?: number;
  limit?: number;
  query?: IQuery;
}

export interface QueryResult<T> {
  data: LeanDocument<T>[];
  total: number;
  page: number;
  limit: number;
}
