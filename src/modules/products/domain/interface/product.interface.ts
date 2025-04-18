import { Document, FilterQuery } from 'mongoose';
import { IAuth } from 'src/modules/auth/auth.interface';
import { UpdateProductDto } from '../../application/dto/update-product.dto';

export interface IProductRepository<T extends Document> {
  create(data: Partial<T>, auth: string): Promise<T>;

  findOne(id: string): Promise<T>;

  findAll(filter: FilterQuery<T>): Promise<T[]>;

  findByPublishOrDraft(filter: FilterQuery<T>): Promise<T[]>;

  actionPublish({
    product_id,
    product_auth,
  }: {
    product_id: string;
    product_auth: string;
  }): Promise<any>;

  actionDraft({
    product_id,
    product_auth,
  }: {
    product_id: string;
    product_auth: string;
  }): Promise<any>;

  search(filter?: FilterQuery<T>): Promise<T[]>;

  update({
    id,
    data,
    auth,
  }: {
    id: string;
    data: UpdateProductDto;
    auth: IAuth;
  }): Promise<T>;

  delete({ id, auth }: { id: string; auth: string }): Promise<any>;
}
