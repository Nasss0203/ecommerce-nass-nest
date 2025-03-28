import { IAuth } from 'src/modules/auth/auth.interface';

export interface IQuery {
  category?: string;
  brand?: string;
  product_auth?: IAuth;
  limit?: number;
  page?: number;
  minPrice?: number;
  maxPrice?: number;
  select?: string[];
  filter?: any;
  isDraft?: boolean;
  isPublished?: boolean;
}
