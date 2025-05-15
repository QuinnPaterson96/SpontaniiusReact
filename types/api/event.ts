// Consolidated interfaces for Event

export interface CreateEventRequest {
  eventTitle: string;
  ownerId: string;
  eventText: string;
  genderRestrict: string;
  icon: string;
  eventStarts: string;
  eventEnds: string;
  StreetName: string | null;
  latitude: number;
  longitude: number;
  maxRadius: number;
  cardIds: number[];
}

export interface EventResponse {
  event_id: number;
  title: string;
  description: string;
  owner_id: string;
  gender_restrict: string;
  icon: string;
  event_starts: string;
  event_ends: string;
  street_name: string | null;
  latitude: number;
  longitude: number;
  max_radius: number;
  participant_ids: string[];
  card_ids: number[];
}

export interface ExtendEventRequest {
  event_end: string;
}

export interface FindEventRequest {
  lat: number;
  lng: number;
  gender: string;
  userId: string;
}

export interface JoinEventRequest {
  user_id: string;
  card_id: number;
  event_id: number;
  meeting_date: string; // ISO 8601 format
}

export interface NearbyEventsRequest {
  lat: number;
  lng: number;
  current_time: string;
  gender: string;
}

export interface UpdateEventCardsRequest {
  card_ids: number[];
}