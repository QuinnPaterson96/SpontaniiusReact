import ApiService from '@/services/api-service';
import { CardCreateRequest, CardResponse } from '@/types/api';
import { User, Card } from '@/types/domain';
import { toCardDomain } from '@/mappers/card-mapper';
import { useCardStore } from '@/state/card-store';
import { useUserStore } from '@/state/user-store'; // assumed

/**
 * Fetches card details with local cache fallback.
 */
export async function getCardDetails(cardIds: number[]): Promise<Card[]> {
  try {
    const cachedCards = useCardStore.getState().cards.filter((card) =>
      cardIds.includes(card.id)
    );

    const cachedCardIds = new Set(cachedCards.map((card) => card.id));
    const missingCardIds = cardIds.filter((id) => !cachedCardIds.has(id));

    if (missingCardIds.length > 0) {
      const response = await ApiService.getCardDetails({ card_ids: missingCardIds });
      const newCards: CardResponse[] = response.data;
      const domainCards: Card[] = newCards.map(toCardDomain)

      if (newCards.length > 0) {
        useCardStore.getState().addCards(domainCards);
        return [...cachedCards, ...domainCards];
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
    const createCardAsDomain = createCard.apply(toCardDomain)

    if (createdCard.cardId != null) {
      useCardStore.getState().addCards([createCardAsDomain]);
      return createdCard.cardId;
    } else {
      throw new Error('card_id missing from response');
    }
  } catch (error: any) {
    console.error('Failed to create card', error);
    throw new Error(error?.message || 'Failed to create card');
  }
}
