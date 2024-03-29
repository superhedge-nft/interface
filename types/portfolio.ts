import { MarketplaceItemType } from "./marketplace";
import { Activity } from "./interface";

export type OfferType = {
  id: number;
  tokenId: string;
  listingId: string;
  price: number;
  startingTime: number;
  quantity: number;
  seller: string;
};

export type MarketplaceItemDetailType = MarketplaceItemType & {
  offers: OfferType[];
  deposits: Activity[];
};
