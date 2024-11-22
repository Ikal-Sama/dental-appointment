// Create zustand store here for announcement notifications


import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Announcement =  {
    id: string,
    title: string,
    description: string,
    status: boolean,
    type: string,
    duration: {
        from: Date,
        to: Date,
    },
}

interface AnnouncementState {
  announcement: Announcement[];
  setAnnouncement: (data: Announcement) => void;
  clearAnnouncement: () => void;
};

export const useAnnouncementStore = create<AnnouncementState>()((set) => ({
  announcement: [],
  setAnnouncement: () => {},
  clearAnnouncement: () => {},
}))