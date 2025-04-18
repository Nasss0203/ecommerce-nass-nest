import { Types } from 'mongoose';

export const convertToObjectIdMongodb = (_id: string | any) =>
  new Types.ObjectId(_id);

export const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 1]));
};

export const generateOrderTrackingCode = () => {
  const prefix = '#';
  const randomNumber = Date.now();
  const paddedNumber = randomNumber.toString().padStart(13, '0');

  return `${prefix}${paddedNumber}`;
};
export const randomProductId = () => {
  return Math.floor(Math.random() * 89999 + 100000);
};

export type LeanDocument<T> = T & { $locals?: never };
