import { Document } from 'mongoose';

export interface ISkuRepository<T extends Document> {
  create(data: Partial<T>): Promise<T>;
}
