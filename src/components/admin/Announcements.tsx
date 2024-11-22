import React from "react";
import ListAnnouncements from "./ListAnnouncements";
import InitAnnouncement from "@/lib/store/initAnnouncement";
import { getAllAnnouncements } from "@/app/actions/announcement";
import { Announcement } from "@/lib/store/announcement";

export default async function Announcements() {
  const announcements = await getAllAnnouncements();
  return (
    <div>
      <ListAnnouncements announcements={announcements as Announcement[]} />
    </div>
  );
}
