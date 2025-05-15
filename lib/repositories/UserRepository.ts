import ApiService from '@/services/apiService';
import { 
  CreateUserRequest, DeleteUserRequest, UpdateUserCardRequest, 
  UpdateUserFCMTokenRequest, UpdateUserRequest, UserResponse 
} from '@/types/api';
import { useUserStore } from '@/state/userStore';

/**
 * Fetches user details from the backend and caches them locally.
 */
export async function fetchUserDetails(userId?: string, externalId?: string): Promise<UserResponse> {
  if (!userId && !externalId) {
    throw new Error('Either userId or externalId must be provided');
  }

  const response = await ApiService.getUser(userId, externalId);
  const user = response.data;
  useUserStore.getState().setUser(user);
  return user;
}

/**
 * Returns locally cached user.
 */
export function getUserFromLocal() {
  return useUserStore.getState().user;
}

/**
 * Clears user from store (logout).
 */
export function clearUser() {
  useUserStore.getState().setUser(null);
}

/**
 * Returns user ID from local store.
 */
export function getUserId(): string | null {
  return useUserStore.getState().user?.id ?? null;
}

/**
 * Returns user's card ID from local store.
 */
export function getUserCardId(): number | null {
  return useUserStore.getState().user?.card_id ?? null;
}

/**
 * Creates a user and caches result.
 */
export async function createUser(request: CreateUserRequest): Promise<UserResponse> {
  const response = await ApiService.createUser(request);
  useUserStore.getState().setUser(response.data);
  return response.data;
}

/**
 * Updates user fields (name, phone, gender).
 */
export async function updateUser(
  name?: string,
  phone?: string,
  gender?: string
): Promise<UserResponse> {
  const user = getUserFromLocal();
  if (!user) throw new Error('No user found in store');

  const request: UpdateUserRequest = {
    name: name ?? user.name,
    phone: phone ?? user.phone,
    gender: gender ?? user.gender,
    cardId: user.card_id?.toString() ?? '',
  };

  const response = await ApiService.updateUser(user.id, request);
  useUserStore.getState().setUser(response.data);
  return response.data;
}

/**
 * Updates user’s card association.
 */
export async function updateUserCard(cardId: number): Promise<UserResponse> {
  const userId = getUserId();
  if (!userId) throw new Error('Missing user ID');

  const request: UpdateUserCardRequest = { user_id: userId, card_id: cardId };
  const response = await ApiService.updateUserCard(request);

  const user = getUserFromLocal();
  if (user) {
    useUserStore.getState().setUser({ ...user, card_id: cardId });
  }

  return response.data;
}

/**
 * Updates FCM token on backend.
 */
export async function updateUserFCMToken(fcmToken: string): Promise<void> {
  const userId = getUserId();
  if (!userId) throw new Error('Missing user ID');

  await ApiService.updateUserFCMToken(userId, { fcm_token: fcmToken });
}

/**
 * Accept Terms & Conditions.
 */
export async function acceptTermsAndConditions(): Promise<void> {
  const userId = getUserId();
  if (!userId) throw new Error('Missing user ID');

  await ApiService.updateTermsAndConditions(userId);
}

/**
 * Delete the user via backend.
 */
export async function deleteUser(): Promise<void> {
  const user = getUserFromLocal();
  if (!user) throw new Error('Missing user');

  const request: DeleteUserRequest = {
    external_id: user.external_id!,
  };

  await ApiService.deleteUser(user.id, request);
  clearUser();
}
