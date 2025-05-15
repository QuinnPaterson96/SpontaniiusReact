import { CardResponse } from '@/types/api';
import { Card } from '@/types/domain';

export function toCardDomain(response: CardResponse): Card {
  return {
    id: response.cardId,
    userId: response.user_id,
    name: response.user_name,
    background: response.background,
    greeting: response.card_text,
  };
}
