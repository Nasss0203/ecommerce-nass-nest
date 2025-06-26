import { Document } from 'mongoose';

export interface IShopRepository<T extends Document> {
  create(data: Partial<T>, auth: string): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
