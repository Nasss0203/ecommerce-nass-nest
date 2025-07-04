import { Document } from 'mongoose';

export interface ISpuRepository<T extends Document> {
  create(data: Partial<T>, auth: string, shopId: string): Promise<T>;
}
