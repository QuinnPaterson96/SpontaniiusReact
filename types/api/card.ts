// Consolidated interfaces for Card

export interface CardCollectionRequest {
  user_id: string;
  card_ids: number[];
  event_id: number;
  meeting_date: string; // ISO 8601 format
}

export interface CardCollectionResponse {
  collection_id: number;
  user_id: string;
  card_ids: number[] | null;
  event_id: number;
  meeting_date: string; // ISO 8601 format
}


export interface CardCreateRequest {
  user_id: string;
  user_name: string;
  card_text: string | null;
  background: string | null;
  background_address: string | null;
}

export interface CardResponse {
  cardId: number;
  user_id: string;
  user_name: string;
  card_text: string | null;
  background: string;
  background_address: string;
}

export interface GetCardsRequest {
  card_ids: number[];
}