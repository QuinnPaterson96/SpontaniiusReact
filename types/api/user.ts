export interface CreateUserRequest {
  external_id: string;
  auth_provider: string;
  name: string;
  gender: string;
}

export interface UpdateUserRequest {
  name: string;
  phone: string;
  gender: string;
}

export interface UpdateUserCardRequest {
  user_id: string;
  card_id: number;
}

export interface UpdateUserLocationRequest {
  lat: number;
  lng: number;
}

export interface UpdateUserFCMTokenRequest {
  fcm_token: string;
}

export interface UserResponse {
  user_id: string;
  name: string;
  gender: string;
  card_id?: number;
}

export interface DeleteUserRequest {
  external_id: string;
}