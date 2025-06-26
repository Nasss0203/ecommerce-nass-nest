type ShopEntityProps = {
  shop_name: string;
  shop_description: string;
  shop_slug: string;
  logo_url: string;
  cover_image_url: string[];
  owner_id: string;
  status: string;
};

export class ShopEntity {
  public shop_name: string;
  public shop_description: string;
  public shop_slug: string;
  public logo_url: string;
  public cover_image_url: string[];
  public owner_id: string;
  public status: string;

  constructor(props: ShopEntityProps) {
    this.shop_name = props.shop_name;
    this.shop_description = props.shop_description;
    this.shop_slug = props.shop_slug;
    this.logo_url = props.logo_url;
    this.cover_image_url = props.cover_image_url;
    this.owner_id = props.owner_id;
    this.status = props.status;
  }

  public static create(props: ShopEntityProps): ShopEntity {
    return new ShopEntity({
      ...props,
    });
  }
}
