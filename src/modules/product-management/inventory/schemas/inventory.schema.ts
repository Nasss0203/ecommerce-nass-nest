import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as SchemaType } from 'mongoose';
import { Auth } from 'src/modules/user-management/auth/schemas/auth.schema';
import { Product } from '../../products/infrastructure/schemas/product.schema';

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema({ timestamps: true, collection: 'Inventories' })
export class Inventory extends Document {
  @Prop({
    type: SchemaType.Types.ObjectId,
    ref: Product.name,
  })
  inventory_productId: SchemaType.Types.ObjectId;

  @Prop({ default: '' })
  inventory_location: string;

  @Prop({ required: true })
  inventory_stock: number;

  @Prop({ type: SchemaType.Types.ObjectId, ref: Auth.name })
  inventory_authId: SchemaType.Types.ObjectId;

  @Prop({ default: [] })
  inventory_reservations: [];
}
export const InventorySchema = SchemaFactory.createForClass(Inventory);
