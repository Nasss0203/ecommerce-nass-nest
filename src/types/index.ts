import { IAuth } from 'src/modules/auth/auth.interface';

export interface IQuery {
  category?: string;
  brand?: string;
  product_auth?: IAuth;
  limit?: number;
  page?: number;
  isDraft?: boolean;
  isPublished?: boolean;
  select?: string[];
  filter?: any;
}
