import axios from 'axios';
import {
  CreateEventRequest,
  JoinEventRequest,
  FindEventRequest,
  ExtendEventRequest,
  UpdateEventCardsRequest,
  PromotionCreateRequest,
  CardCreateRequest,
  GetCardsRequest,
  CardCollectionRequest,
  ReportRequest,
  CreateUserRequest,
  UpdateUserCardRequest,
  UpdateUserRequest,
  UpdateUserLocationRequest,
  UpdateUserFCMTokenRequest,
  DeleteUserRequest,
  EventResponse,
  CardResponse,
  CardCollectionResponse,
  ReportResponse,
  UserResponse,
} from '../types/api';

export const api = axios.create({
  baseURL: 'https://fgvdpt3hht.us-east-1.awsapprunner.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const ApiService = {
  /** EVENTS **/
  createEvent: (request: CreateEventRequest) =>
    api.post<EventResponse>('events/create', request),

  joinEvent: (request: JoinEventRequest) =>
    api.patch<EventResponse>('events/join', request),

  getNearbyEvents: (request: FindEventRequest) =>
    api.post<EventResponse[]>('events/nearby', request),

  getEventById: (eventId: number) =>
    api.get<EventResponse>(`events/${eventId}`),

  extendEvent: (eventId: number, request: ExtendEventRequest) =>
    api.patch<EventResponse>(`events/${eventId}/extend`, request),

  endEvent: (eventId: number) =>
    api.patch<EventResponse>(`events/${eventId}/end`, {}),

  updateEventCards: (eventId: number, request: UpdateEventCardsRequest) =>
    api.patch<EventResponse>(`events/${eventId}/update_cards`, request),

  /** PROMOTIONS **/
  createPromotion: (request: PromotionCreateRequest) =>
    api.post<Record<string, any>>('promotions/create', request),

  getAllPromotions: () =>
    api.get<Record<string, any>[]>('promotions/all'),

  getPromotionById: (promotionId: number) =>
    api.get<Record<string, any>>(`promotions/${promotionId}`),

  /** CARDS **/
  createCard: (request: CardCreateRequest) =>
    api.post<CardResponse>('cards/create', request),

  getCardById: (cardId: number) =>
    api.get<Record<string, any>>(`cards/${cardId}`),

  getCardDetails: (request: GetCardsRequest) =>
    api.post<CardResponse[]>('cards/get-cards', request),

  /** CARD COLLECTIONS **/
  createOrUpdateCardCollection: (request: CardCollectionRequest) =>
    api.post<CardCollectionResponse>('card-collections/create', request),

  getUserCardCollections: (userId: string) =>
    api.get<CardCollectionResponse[]>(`card-collections/${userId}`),

  /** REPORTS **/
  reportUser: (request: ReportRequest) =>
    api.post<ReportResponse>('reports/report', request),

  /** USERS **/
  checkUserExists: (externalId: string) =>
    api.get<UserResponse>(`users/check-user?external_id=${externalId}`),

  createUser: (request: CreateUserRequest) =>
    api.post<UserResponse>('users/register', request),

  updateUserCard: (request: UpdateUserCardRequest) =>
    api.put<UserResponse>('users/update_card', request),

  getUser: (userId?: string, externalId?: string) =>
    api.get<UserResponse>('users/get', {
      params: { user_id: userId, external_id: externalId },
    }),

  checkUser: (userId?: string, externalId?: string) =>
    api.get<UserResponse>('users/check-user', {
      params: { user_id: userId, external_id: externalId },
    }),

  updateUser: (userId: string, request: UpdateUserRequest) =>
    api.patch<UserResponse>(`users/${userId}`, request),

  updateUserLocation: (userId: string, request: UpdateUserLocationRequest) =>
    api.patch<UserResponse>(`users/${userId}/location`, request),

  updateUserFCMToken: (userId: string, request: UpdateUserFCMTokenRequest) =>
    api.patch<void>(`users/${userId}/fcm-token`, request),

  updateTermsAndConditions: (userId: string) =>
    api.patch<void>(`users/${userId}/accept-terms`, {}),

  deleteUser: (userId: string, request: DeleteUserRequest) =>
    api.request<void>({
      url: `users/${userId}`,
      method: 'DELETE',
      data: request,
    }),
};

export default ApiService;
