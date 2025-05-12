export interface CardCreateRequest {
  user_id: string;
  background_color: string;
  greeting_text: string;
  phone_included: boolean;
  phone_number?: string;
  greeting_type: string;
  name: string;
}

export interface CardResponse {
  card_id: number;
  user_id: string;
  background_color: string;
  greeting_text: string;
  phone_included: boolean;
  phone_number?: string;
  greeting_type: string;
  name: string;
}