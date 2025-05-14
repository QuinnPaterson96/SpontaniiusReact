export interface CardCollectionRequest {
  user_id: string;
  card_ids: number[];
  event_id: number;
  meeting_date: string; // ISO string e.g. "2024-03-01T12:30:00Z"
}

export interface CardCollectionResponse {
  collection_id: number;
  user_id: string;
  card_ids: number[] | null;
  event_id: number;
  meeting_date: string; // ISO string — use Date parsing in logic if needed
}
