import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    university: string;
    position: string;
  } | null;
  score: number;
  items: Array<{
    id: string;
    question: string;
    type: string;
    options: Array<{
      id: string;
      text: string;
    }>;
    answer: string[];
  }>;
};

type Action = {
  updateUser: (firstName: State['user']) => void;
  updateScore: (lastName: State['score']) => void;
  updateItems: (lastName: State['items']) => void;
};

export const useSessionStore = create(
  persist<State & Action>(
    (set) => ({
      user: null,
      score: 0,
      items: [],
      updateUser: (user) => set(() => ({ user })),
      updateScore: (score) => set(() => ({ score })),
      updateItems: (items) => set(() => ({ items })),
    }),
    {
      name: 'game-session',
    }
  )
);
