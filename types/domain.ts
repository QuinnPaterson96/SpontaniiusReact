// types/domain.ts
export interface Card {
  id: number;
  userId: string;
  name: string;
  background: string;
  greeting?: string | null;
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
