import ApiService from '@/services/api-service';
import { CardCollectionRequest, CardCollectionResponse } from '@/types/api';

/**
 * Gets the user's card collections from the backend.
 */
export async function getUserCardCollections(userId: string): Promise<CardCollectionResponse[]> {
  const response = await ApiService.getUserCardCollections(userId);
  return response.data;
}

/**
 * Creates or updates a user's card collection.
 */
export async function createOrUpdateCardCollection(
  userId: string,
  cardIds: number[],
  eventId: number,
  meetingDate: string
): Promise<CardCollectionResponse> {
  const request: CardCollectionRequest = {
    user_id: userId,
    card_ids: cardIds,
    event_id: eventId,
    meeting_date: meetingDate,
  };

  const response = await ApiService.createOrUpdateCardCollection(request);
  return response.data;
}
