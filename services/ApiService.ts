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
} from '../types//api/'

const api = axios.create({
  baseURL: 'https://your-api-url.com', // Replace with your actual backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

const ApiService = {
  createEvent: (request: CreateEventRequest) => api.post<EventResponse>('events/create', request),
  joinEvent: (request: JoinEventRequest) => api.patch<EventResponse>('events/join', request),
  getNearbyEvents: (request: FindEventRequest) => api.post<EventResponse[]>('events/nearby', request),
  getEventById: (eventId: number) => api.get<EventResponse>(`events/${eventId}`),
  extendEvent: (eventId: number, request: ExtendEventRequest) => api.patch<EventResponse>(`events/${eventId}/extend`, request),
  endEvent: (eventId: number) => api.patch<EventResponse>(`events/${eventId}/end`, {}),
  updateEventCards: (eventId: number, request: UpdateEventCardsRequest) => api.patch<EventResponse>(`events/${eventId}/update_cards`, request),

  createPromotion: (request: PromotionCreateRequest) => api.post<Record<string, any>>('promotions/create', request),
  getAllPromotions: () => api.get<Record<string, any>[]>('promotions/all'),
  getPromotionById: (promotionId: number) => api.get<Record<string, any>>(`promotions/${promotionId}`),

  createCard: (request: CardCreateRequest) => api.post<CardResponse>('cards/create', request),
  getCardById: (cardId: number) => api.get<Record<string, any>>(`cards/${cardId}`),
  getCardDetails: (request: GetCardsRequest) => api.post<CardResponse[]>('cards/get-cards', request),

  createOrUpdateCardCollection: (request: CardCollectionRequest) => api.post<CardCollectionResponse>('card-collections/create', request),
  getUserCardCollections: (userId: string) => api.get<CardCollectionResponse[]>(`card-collections/${userId}`),

  reportUser: (request: ReportRequest) => api.post<ReportResponse>('reports/report', request),

  checkUserExists: (externalId: string) => api.get<UserResponse>(`users/check-user?external_id=${externalId}`),
  createUser: (request: CreateUserRequest) => api.post<UserResponse>('users/register', request),
  updateUserCard: (request: UpdateUserCardRequest) => api.put<UserResponse>('users/update_card', request),
  getUser: (userId?: string, externalId?: string) =>
    api.get<UserResponse>('users/get', { params: { user_id: userId, external_id: externalId } }),
  checkUser: (userId?: string, externalId?: string) =>
    api.get<UserResponse>('users/check-user', { params: { user_id: userId, external_id: externalId } }),
  updateUser: (userId: string, request: UpdateUserRequest) => api.patch<UserResponse>(`users/${userId}`, request),
  updateUserLocation: (userId: string, request: UpdateUserLocationRequest) => api.patch<UserResponse>(`users/${userId}/location`, request),
  updateUserFCMToken: (userId: string, request: UpdateUserFCMTokenRequest) => api.patch(`users/${userId}/fcm-token`, request),
  updateTermsAndConditions: (userId: string) => api.patch(`users/${userId}/accept-terms`, {}),
  deleteUser: (userId: string, request: DeleteUserRequest) => api.request({
    url: `users/${userId}`,
    method: 'DELETE',
    data: request,
  }),
};

export default ApiService;