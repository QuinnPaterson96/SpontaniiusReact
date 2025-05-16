import ApiService from '@/services/api-service';
import {
  CreateEventRequest,
  ExtendEventRequest,
  EventResponse,
  FindEventRequest,
  JoinEventRequest,
} from '@/types/api';
import { Event } from '@/types/domain';
import { LatLng } from 'react-native-maps'; // if using Expo's MapView
import dayjs from 'dayjs';
import { toEventDomain } from '@/mappers/event-mapper';

/**
 * Fetch nearby events from the API.
 */
export async function getNearbyEvents(
  lat: number,
  lng: number,
  gender: string | null,
  userId: string
): Promise<Event[]> {
  const request: FindEventRequest = {
    lat,
    lng,
    gender: gender ?? 'Any',
    userId,
  };

  const response = await ApiService.getNearbyEvents(request);
  const responseAsDomain = response.data.map
  return response.data.map((e) => e as Event); // Or map with a toDomain() if needed
}

/**
 * Create a new event.
 */
export async function createEvent(
  title: string,
  description: string,
  gender: string,
  icon: string,
  event_starts: string,
  event_ends: string,
  streetName: string | null,
  latLng: LatLng,
  max_radius: number,
  userId: string,
  userCardId: number
): Promise<EventResponse> {
  const request: CreateEventRequest = {
    eventTitle: title,
    ownerId: userId,
    eventText: description,
    genderRestrict: gender,
    icon,
    eventStarts: event_starts,
    eventEnds: event_ends,
    StreetName: streetName,
    latitude: latLng.latitude,
    longitude: latLng.longitude,
    maxRadius: max_radius,
    cardIds: [userCardId],
  };

  const response = await ApiService.createEvent(request);
  return response.data;
}

/**
 * Extend event by 15 minutes.
 */
export async function extendEvent15Mins(eventId: number, currentEndTime: string): Promise<EventResponse> {
  const newEndTime = dayjs(currentEndTime).add(15, 'minute').toISOString();

  const request: ExtendEventRequest = {
    event_end: newEndTime,
  };

  const response = await ApiService.extendEvent(eventId, request);
  return response.data;
}

/**
 * End the event.
 */
export async function endEvent(eventId: number): Promise<EventResponse> {
  const response = await ApiService.endEvent(eventId);
  return response.data;
}

/**
 * Get full event details.
 */
export async function fetchEventDetails(eventId: number): Promise<Event> {
  const response = await ApiService.getEventById(eventId);
  return response.data as Event; // Add .toDomain() if needed
}

/**
 * Join an event.
 */
export async function joinEvent(userId: string, cardId: number, eventId: number): Promise<EventResponse> {
  const request: JoinEventRequest = {
    user_id: userId,
    card_id: cardId,
    event_id: eventId,
    meeting_date: formatDate(new Date()),
  };

  const response = await ApiService.joinEvent(request);
  return response.data;
}

/**
 * Generate Google Maps URL.
 */
export function getGoogleMapsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

/**
 * Format date to ISO 8601 UTC.
 */
export function formatDate(date: Date): string {
  return dayjs(date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
}
