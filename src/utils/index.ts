import { Types } from 'mongoose';

export const convertToObjectIdMongodb = (id: any) => new Types.ObjectId(id);
