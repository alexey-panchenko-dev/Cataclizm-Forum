import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { DisasterEvent } from '@/entities/disaster/model/types';

export type UserProfile = {
  nickname: string;
  email: string;
};

export type EventComment = {
  id: string;
  eventId: string;
  author: string;
  authorEmail: string;
  text: string;
  createdAt: string;
};

export type SupportResource = {
  id: string;
  title: string;
  category: string;
  contact: string;
  description: string;
};

export type HelpRequest = {
  id: string;
  title: string;
  type: 'Нужна помощь' | 'Могу помочь';
  contact: string;
  description: string;
  author: string;
  createdAt: string;
};

type AppState = {
  profile: UserProfile | null;
  customEvents: DisasterEvent[];
  comments: EventComment[];
  supportResources: SupportResource[];
  helpRequests: HelpRequest[];
  saveProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
  addEvent: (event: DisasterEvent) => void;
  addComment: (comment: Omit<EventComment, 'id' | 'createdAt'>) => void;
  addSupportResource: (resource: Omit<SupportResource, 'id'>) => void;
  addHelpRequest: (request: Omit<HelpRequest, 'id' | 'createdAt'>) => void;
};

function createId() {
  return crypto.randomUUID();
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      profile: null,
      customEvents: [],
      comments: [],
      supportResources: [],
      helpRequests: [],

      saveProfile: (profile) => set({ profile }),
      clearProfile: () => set({ profile: null }),
      addEvent: (event) =>
        set((state) => ({ customEvents: [...state.customEvents, event] })),
      addComment: (comment) =>
        set((state) => ({
          comments: [
            ...state.comments,
            { ...comment, id: createId(), createdAt: new Date().toISOString() },
          ],
        })),
      addSupportResource: (resource) =>
        set((state) => ({
          supportResources: [...state.supportResources, { ...resource, id: createId() }],
        })),
      addHelpRequest: (request) =>
        set((state) => ({
          helpRequests: [
            ...state.helpRequests,
            { ...request, id: createId(), createdAt: new Date().toISOString() },
          ],
        })),
    }),
    {
      name: 'posle-katastrofy-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
