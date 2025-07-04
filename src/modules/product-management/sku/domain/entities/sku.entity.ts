type SkuEntityProps = {
  sku_id: string;
  sku_tier_index: [];
  sku_default: boolean;
  sku_slug: string;
  sku_sort: number;
  sku_price: string;
  sku_stock: number;
  product_id: string;
  isDraft: boolean;
  isPublished: boolean;
  isDeleted: boolean;
};

export class SkuEntity {
  public sku_id: string;
  public sku_tier_index: [];
  public sku_default: boolean;
  public sku_slug: string;
  public sku_sort: number;
  public sku_price: string;
  public sku_stock: number;
  public product_id: string;
  public isDraft: boolean;
  public isPublished: boolean;
  public isDeleted: boolean;

  constructor(props: SkuEntityProps) {
    Object.assign(this, props);
  }

  public static create(props: SkuEntityProps): SkuEntity {
    return new SkuEntity(props);
  }
}
