type ProductEntityProps = {
  product_name: string;
  product_thumb: string;
  product_description: string | null;
  product_price: number;
  product_images: string[];
  product_slug: string | null;
  product_quantity: number;
  product_category: string;
  product_shop: string;
  product_brand: string;
  product_attributes: Record<string, any>;
  product_auth: string;
  product_ratingAverage: number;
  product_variations: any[];
  isDraft: boolean;
  isPublished: boolean;
};

export class ProductEntity {
  public product_name: string;
  public product_thumb: string;
  public product_description: string | null;
  public product_price: number;
  public product_images: string[];
  public product_slug: string | null;
  public product_quantity: number;
  public product_category: string;
  public product_brand: string;
  public product_attributes: Record<string, any>;
  public product_auth: string;
  public product_ratingAverage: number;
  public product_variations: [];
  public isDraft: boolean;
  public isPublished: boolean;
  public product_shop: string;

  // Constructor accepts a props object containing the necessary properties
  constructor(props: ProductEntityProps) {
    // this.product_name = props.product_name;
    // this.product_thumb = props.product_thumb;
    // this.product_description = props.product_description;
    // this.product_price = props.product_price;
    // this.product_images = props.product_images;
    // this.product_slug = props.product_slug;
    // this.product_quantity = props.product_quantity;
    // this.product_category = props.product_category;
    // this.product_brand = props.product_brand;
    // this.product_attributes = props.product_attributes;
    // this.product_auth = props.product_auth;
    // this.product_ratingAverage = props.product_ratingAverage;
    // this.product_variations = props.product_variations;
    // this.isDraft = props.isDraft;
    // this.isPublished = props.isPublished;
    // this.product_shop = props.product_shop;
    Object.assign(this, props);
  }

  // Static method to create a Product instance
  public static create(props: ProductEntityProps): ProductEntity {
    return new ProductEntity({ ...props });
  }

  publish() {
    this.isDraft = false;
    this.isPublished = true;
  }

  createDraft() {
    this.isDraft = true;
    this.isPublished = false;
  }

  applyDiscount(percent: number) {
    if (percent < 0 || percent > 100) return;
    this.product_price -= this.product_price * (percent / 100);
  }

  isAvailable(): boolean {
    return this.product_quantity > 0;
  }
}
