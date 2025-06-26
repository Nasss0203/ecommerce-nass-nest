import { Types } from 'mongoose';

export class CreateInventoryDto {
  inventory_productId: Types.ObjectId;

  inventory_location: string;

  inventory_stock: number;

  inventory_authId: Types.ObjectId;

  inventory_reservations: [];
}
