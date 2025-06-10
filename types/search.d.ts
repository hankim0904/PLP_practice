export interface ISearchCard {
  check_wish: boolean;
  id: number;
  image: string;
  name_en: string;
  price: string;
  group_name_en: string;
  group_image: string;
  member_name_en: string;
  member_image: string;
  sell_offer_date: string;
  wish_count: number;
  sales_volume: number;
  stocked_count: number;
  best_pick: boolean;
  recently_price?: string;
  discount_rate?: Nullish<number>;
  discounted_price: string;
  is_in_promotion: boolean;
}

export interface ISearchResponse {
  code: string;
  success: boolean;
  data: {
    count: number;
    next_page: number | null;
    results: ISearchCard[];
  };
}
