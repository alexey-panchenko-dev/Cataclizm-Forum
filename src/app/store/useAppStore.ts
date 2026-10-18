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
  creatorEmail: string;
};

export type HelpRequest = {
  id: string;
  title: string;
  type: 'Нужна помощь' | 'Могу помочь';
  contact: string;
  description: string;
  author: string;
  authorEmail: string;
  createdAt: string;
};

export type ColorTheme = 'light' | 'dark';

type AppState = {
  profile: UserProfile | null;
  customEvents: DisasterEvent[];
  comments: EventComment[];
  supportResources: SupportResource[];
  helpRequests: HelpRequest[];
  theme: ColorTheme;
  saveProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
  setTheme: (theme: ColorTheme) => void;
  addEvent: (event: DisasterEvent) => void;
  removeEvent: (eventId: string) => void;
  addComment: (comment: Omit<EventComment, 'id' | 'createdAt'>) => void;
  removeComment: (commentId: string) => void;
  addSupportResource: (resource: Omit<SupportResource, 'id'>) => void;
  removeSupportResource: (resourceId: string) => void;
  addHelpRequest: (request: Omit<HelpRequest, 'id' | 'createdAt'>) => void;
  removeHelpRequest: (requestId: string) => void;
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
      theme: 'light',

      saveProfile: (profile) =>
        set((state) => {
          const previousEmail = state.profile?.email;

          if (!previousEmail) return { profile };

          return {
            profile,
            customEvents: state.customEvents.map((event) =>
              event.creatorEmail === previousEmail
                ? { ...event, creatorEmail: profile.email }
                : event,
            ),
            comments: state.comments.map((comment) =>
              comment.authorEmail === previousEmail
                ? { ...comment, author: profile.nickname, authorEmail: profile.email }
                : comment,
            ),
            supportResources: state.supportResources.map((resource) =>
              resource.creatorEmail === previousEmail
                ? { ...resource, creatorEmail: profile.email }
                : resource,
            ),
            helpRequests: state.helpRequests.map((request) =>
              request.authorEmail === previousEmail
                ? { ...request, author: profile.nickname, authorEmail: profile.email }
                : request,
            ),
          };
        }),
      clearProfile: () => set({ profile: null }),
      setTheme: (theme) => set({ theme }),
      addEvent: (event) =>
        set((state) => ({ customEvents: [...state.customEvents, event] })),
      removeEvent: (eventId) =>
        set((state) => ({
          customEvents: state.customEvents.filter((event) => event.id !== eventId),
          comments: state.comments.filter((comment) => comment.eventId !== eventId),
        })),
      addComment: (comment) =>
        set((state) => ({
          comments: [
            ...state.comments,
            { ...comment, id: createId(), createdAt: new Date().toISOString() },
          ],
        })),
      removeComment: (commentId) =>
        set((state) => ({
          comments: state.comments.filter((comment) => comment.id !== commentId),
        })),
      addSupportResource: (resource) =>
        set((state) => ({
          supportResources: [...state.supportResources, { ...resource, id: createId() }],
        })),
      removeSupportResource: (resourceId) =>
        set((state) => ({
          supportResources: state.supportResources.filter(
            (resource) => resource.id !== resourceId,
          ),
        })),
      addHelpRequest: (request) =>
        set((state) => ({
          helpRequests: [
            ...state.helpRequests,
            { ...request, id: createId(), createdAt: new Date().toISOString() },
          ],
        })),
      removeHelpRequest: (requestId) =>
        set((state) => ({
          helpRequests: state.helpRequests.filter((request) => request.id !== requestId),
        })),
    }),
    {
      name: 'posle-katastrofy-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
