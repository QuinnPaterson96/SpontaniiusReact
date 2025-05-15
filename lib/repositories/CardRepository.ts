import ApiService from '@/services/apiService';
import { CardCreateRequest, CardResponse } from '@/types/api';
import { User } from '@/types/domain';
import { useCardStore } from '@/state/cardStore';
import { useUserStore } from '@/state/userStore'; // assumed

/**
 * Fetches card details with local cache fallback.
 */
export async function getCardDetails(cardIds: number[]): Promise<CardResponse[]> {
  try {
    const cachedCards = useCardStore.getState().cards.filter((card) =>
      cardIds.includes(card.id)
    );

    const cachedCardIds = new Set(cachedCards.map((card) => card.id));
    const missingCardIds = cardIds.filter((id) => !cachedCardIds.has(id));

    if (missingCardIds.length > 0) {
      const response = await ApiService.getCardDetails({ card_ids: missingCardIds });
      const newCards = response.data;

      if (newCards.length > 0) {
        useCardStore.getState().addCards(newCards);
        return [...cachedCards, ...newCards];
      }
    }

    return cachedCards;
  } catch (error) {
    console.error('Failed to get card details', error);
    return [];
  }
}

/**
 * Creates a card for the current user.
 */
export async function createCard(card_text: string | null, backgroundId: number): Promise<number> {
  const user = useUserStore.getState().user;

  if (!user?.id) {
    throw new Error('Invalid user data');
  }

  const request: CardCreateRequest = {
    user_id: user.id,
    user_name: user.name,
    card_text,
    background: backgroundId.toString(),
    background_address: '',
  };

  try {
    const response = await ApiService.createCard(request);
    const createdCard = response.data;

    if (createdCard.cardId != null) {
      useCardStore.getState().addCards([createdCard]);
      return createdCard.cardId;
    } else {
      throw new Error('card_id missing from response');
    }
  } catch (error: any) {
    console.error('Failed to create card', error);
    throw new Error(error?.message || 'Failed to create card');
  }
}
