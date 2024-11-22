"use client";
import React, { useEffect, useRef } from "react";
import { Announcement, useAnnouncementStore } from "./announcement";

export default function InitAnnouncement({
  announcement,
}: {
  announcement: Announcement[];
}) {
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current) {
      useAnnouncementStore.setState({ announcement });
    }
    initState.current = true;
  }, []);

  return <></>;
}
