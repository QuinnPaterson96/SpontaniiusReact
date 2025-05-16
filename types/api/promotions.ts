// Consolidated interfaces for Promotion

export interface PromotionCreateRequest {
  promotionAddress: number[];
  promotionTitle: string;
  promotionText: string;
  icon: string;
  background: string;
  background_address: string;
}