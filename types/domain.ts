export interface Card {
  id: number;
  userId: string;
  name: string;
  background: string;
  greeting?: string | null;
}

export interface Event {
  eventId: number;
  ownerId: string;
  title: string;
  description?: string | null;
  gender: string;
  streetName?: string | null;
  icon: string;
  startTime: string;
  endTime: string;
  latitude: number;
  longitude: number;
  invitation: number;
  cardIds: number[];
  distance?: number | null;
}

export interface User {
  id: string;
  name: string;
  phone?: string | null;
  gender?: string | null;
  cardId?: number | null;
  externalId?: string | null;
  authProvider?: string | null;
  terms_accepted: boolean;
}
