// state/cardStore.ts

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/lib/mmkvStorage';
import { Card } from '@/types/domain';

interface CardState {
  cards: Card[];
  addCard: (card: Card) => void;
  addCards: (cards: Card[]) => void;
  getCardsByIds: (cardIds: number[]) => Card[];
  clearCards: () => void;
}

export const useCardStore = create<CardState>()(
  persist(
    (set, get) => ({
      cards: [],

      addCard: (card) => {
        set((state) => ({
          cards: [...state.cards.filter(c => c.id !== card.id), card],
        }));
      },

      addCards: (newCards) => {
        const existingIds = new Set(get().cards.map((c) => c.id));
        const merged = [
          ...get().cards.filter((c) => !newCards.find((nc) => nc.id === c.id)),
          ...newCards,
        ];
        set({ cards: merged });
      },

      getCardsByIds: (cardIds) => {
        return get().cards.filter((card) => cardIds.includes(card.id));
      },

      clearCards: () => {
        set({ cards: [] });
      },
    }),
    {
      name: 'spontaniius-cards',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
