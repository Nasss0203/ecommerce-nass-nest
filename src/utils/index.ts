import { Types } from 'mongoose';
import slugify from 'slugify';

export const convertToObjectIdMongodb = (_id: any) => new Types.ObjectId(_id);

export const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 1]));
};

export const randomProductId = () => {
  return Math.floor(Math.random() * 89999 + 100000);
};

export const generateOrderTrackingCode = () => {
  const prefix = '#';
  const randomNumber = Date.now();
  const paddedNumber = randomNumber.toString().padStart(13, '0');

  return `${prefix}${paddedNumber}`;
};

export type LeanDocument<T> = T & { $locals?: never };

export function generateSlug(text: string): string {
  return slugify(text, {
    lower: true,
    locale: 'vi',
    strict: true, // bỏ ký tự đặc biệt
  });
}
