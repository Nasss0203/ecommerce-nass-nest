export class CreateShopDto {
  shop_name: string;
  shop_description: string;
  shop_slug: string;
  logo_url: string;
  cover_image_url: string[];
  owner_id: string;
  status: string;
}
