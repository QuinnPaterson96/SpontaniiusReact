import { EventResponse } from '@/types/api';
import { Event } from '@/types/domain';

export function toEventDomain(response: EventResponse): Event {
  return {
    eventId: response.event_id,
    ownerId: response.owner_id,
    title: response.title,
    description: response.description ?? null,
    gender: response.gender_restrict,
    streetName: response.street_name ?? null,
    icon: response.icon,
    startTime: response.event_starts,
    endTime: response.event_ends,
    latitude: response.latitude,
    longitude: response.longitude,
    invitation: response.max_radius,         // 🔄 mapped from max_radius
    cardIds: response.card_ids,
    distance: null,                          // API doesn't provide distance, so we null-init
  };
}
