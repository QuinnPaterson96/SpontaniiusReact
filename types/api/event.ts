export interface CreateEventRequest {
  owner_id: string;
  card_ids: number[];
  event_title: string;
  event_text: string;
  gender_restrict: string;
  latitude: number;
  longitude: number;
  icon: string;
  max_radius: number;
  event_starts: string;
  event_ends: string;
}

export interface JoinEventRequest {
  user_id: string;
  card_id: number;
  event_id: number;
  meeting_date: string;
}

export interface ExtendEventRequest {
  event_end: string;
}

export interface UpdateEventCardsRequest {
  card_ids: number[];
}

export interface FindEventRequest {
  lat: number;
  lng: number;
  gender: string;
  user_id: string;
}

export interface EventResponse {
  event_id: number;
  owner_id: string;
  participant_ids: string[];
  card_ids: number[];
  event_title: string;
  event_text: string;
  gender_restrict: string;
  street_address: string;
  icon: string;
  max_radius: number;
  event_starts: string;
  event_ends: string;
  distance?: number;
}