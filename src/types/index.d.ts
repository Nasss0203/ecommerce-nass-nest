import { IQuery } from 'src/interfaces';

export interface ICheckoutReview {
  cartId: string;
  userId: string;
  order_ids: [IOrderId];
}

interface IOrderId {
  userId: string;
  shop_discount?: [
    {
      shopId: string;
      discountId: string;
      codeId: string;
    },
  ];
  item_products: [
    {
      productId: string;
      quantity: number;
      price: number;
    },
  ];
}

export interface IResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface IQueryAdvanced {
  filter?: Record<string, any>;
  query?: IQuery;
  page?: number;
  skip?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
  select?: string[];
}
