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
