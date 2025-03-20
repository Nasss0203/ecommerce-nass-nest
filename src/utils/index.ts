import { Types } from 'mongoose';

export const convertToObjectIdMongodb = (_id: any) => new Types.ObjectId(_id);

export const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 1]));
};
