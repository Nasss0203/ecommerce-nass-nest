type SpuEntityProps = {
  product_id?: string;
  product_name: string;
  product_thumb: string;
  product_description?: string;
  product_price: number;
  product_images?: string[];
  product_slug?: string;
  product_quantity: number;
  product_shop: string;
  product_category: string;
  product_brand: string;
  product_attributes: Record<string, any>;
  product_auth: string;
  product_ratingAverage?: number;
  product_variations?: any[];
  isDraft?: boolean;
  isPublished?: boolean;
  isDeleted?: boolean;
  sku_list?: any[];
};

export class SpuEntity {
  public product_id?: string;
  public product_name: string;
  public product_thumb: string;
  public product_description?: string;
  public product_price: number;
  public product_images: string[];
  public product_slug: string;
  public product_quantity: number;
  public product_shop: string;
  public product_category: string;
  public product_brand: string;
  public product_attributes: Record<string, any>;
  public product_auth: string;
  public product_ratingAverage?: number;
  public product_variations?: any[];
  public isDraft?: boolean;
  public isPublished?: boolean;
  public isDeleted?: boolean;
  public sku_list?: any[];

  constructor(props: SpuEntityProps) {
    Object.assign(this, props);
  }

  public static create(props: SpuEntityProps): SpuEntity {
    return new SpuEntity(props);
  }
}
