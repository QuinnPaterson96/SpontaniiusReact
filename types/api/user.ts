// Consolidated interfaces for User

export interface CreateUserRequest {
  name: string;
  phone: string | null;
  gender: string | null;
  card_id: string | null;
  external_id: string | null;
  auth_provider: string | null;
}

export interface DeleteUserRequest {
  external_id: string;
}

export interface UpdateUserCardRequest {
  user_id: string;
  card_id: number;
}

export interface UpdateUserFCMTokenRequest {
  fcmToken: string;
}

export interface UpdateUserLocationRequest {
  latitude: number;
  longitude: number;
}

export interface UpdateUserRequest {
  name?: string;
  phone?: string;
  gender?: string;
  cardId: string;
}

export interface UserResponse {
  id: string;
  name: string;
  phone: string | null;
  gender: string | null;
  card_id: number | null;
  external_id: string | null;
  auth_provider: string | null;
  terms_accepted: boolean;
}