// Create zustand store here for announcement notifications


import { create } from "zustand";
import { persist } from "zustand/middleware";

type Announcement =  {
    id: number,
    title: string,
    description: string,
    isOpen: boolean,
}

type AnnouncementState = {
  announcement: Announcement | null;
  setAnnouncement: (data: Announcement) => void;
  clearAnnouncement: () => void;
};

export const useAnnouncementStore = create<AnnouncementState>()(
  persist(
    (set) => ({
      announcement: null, // Initial state
      setAnnouncement: (data) => set({ announcement: data }), // Set announcement
      clearAnnouncement: () => set({ announcement: null }), // Clear announcement
    }),
    {
      name: "announcement-storage", // Key for localStorage
    }
  )
);
