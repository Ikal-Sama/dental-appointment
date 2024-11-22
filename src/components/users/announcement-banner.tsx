"use client";

import { useAnnouncementStore } from "@/lib/store/announcement";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { getAnnouncementToday } from "@/app/actions/announcement";
import { Percent, PercentCircle } from "lucide-react";

export default function AnnouncementBanner() {
  const [todayAnnouncements, setTodayAnnouncements] = useState([]);
  const [openClosed, setOpenClosed] = useState(false);
  const [openDiscount, setOpenDiscount] = useState(false);
  const currentDate = new Date();
  // Fetch announcements for today on mount
  useEffect(() => {
    const fetchAnnouncements = async () => {
      const announcements = await getAnnouncementToday();

      // Filter out only active announcements and check if the 'to' date has passed
      const activeAnnouncements = announcements.filter((announcement: any) => {
        const announcementEndDate = new Date(announcement.duration.to);
        return (
          announcement.status === "active" && announcementEndDate >= currentDate // Check if the end date is today or in the future
        );
      });

      setTodayAnnouncements(activeAnnouncements);

      // Check if there are any 'closed' or 'discount' announcements and open respective dialogs
      if (
        activeAnnouncements.some(
          (announcement: any) => announcement.type === "closed"
        )
      ) {
        setOpenClosed(true);
      }
      if (
        activeAnnouncements.some(
          (announcement: any) => announcement.type === "discount"
        )
      ) {
        setOpenDiscount(true);
      }
    };

    fetchAnnouncements();
  }, []);

  // Separate active announcements by type
  const closedAnnouncements = todayAnnouncements.filter(
    (announcement: any) => announcement.type === "closed"
  );
  const discountAnnouncements = todayAnnouncements.filter(
    (announcement: any) => announcement.type === "discount"
  );

  return (
    <div className='mt-20'>
      {/* Render banner for 'closed' announcements */}
      {closedAnnouncements.length > 0 && (
        <div
          className=' text-white p-4 mb-4 rounded-md text-center'
          style={{
            backgroundImage:
              'url("https://img.freepik.com/free-photo/vials-medical-tools-arrangement-top-view_23-2149341597.jpg?t=st=1732250037~exp=1732253637~hmac=ca6e7dd686ac1a11c3b4e965a1f4c45baac4e1244839a4a2fcf02f725edc42b8&w=996")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className='flex justify-center'>
            <div className='text-red-500  w-[32rem] border-2 border-red-500 p-3 rounded-full'>
              <span className='text-3xl'>Announcement!</span>
            </div>
          </div>

          {closedAnnouncements.map((announcement: any) => (
            <div key={announcement.id} className='mt-2'>
              <h3 className='font-bold text-xl'>{announcement.title}</h3>
              <p>{announcement.description}</p>
              <div className='flex gap-5 text-sm mt-3 justify-center text-gray-200'>
                <span className='ml-2'>
                  From: {announcement.duration.from.toLocaleDateString()}
                </span>
                <span className='ml-2'>
                  To: {announcement.duration.to.toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Render banner for 'discount' announcements */}
      {discountAnnouncements.length > 0 && (
        <div className='bg-teal-500 text-white p-4 mb-4 rounded-md text-center'>
          <h2 className='text-3xl font-semibold flex gap-3 items-center justify-center'>
            <Percent /> Discount Announcements
          </h2>
          {discountAnnouncements.map((announcement: any) => (
            <div key={announcement.id} className='mt-2'>
              <h3 className='font-bold'>{announcement.title}</h3>
              <p>{announcement.description}</p>
              <div className='flex gap-5 text-sm mt-3 justify-center text-gray-200'>
                <span className='ml-2'>
                  From: {announcement.duration.from.toLocaleDateString()}
                </span>
                <span className='ml-2'>
                  To: {announcement.duration.to.toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* If no active announcements are available */}
      {todayAnnouncements.length === 0 && (
        <div className='text-gray-500'>No active announcements for today.</div>
      )}

      {/* Auto-open Alert Dialog for 'closed' announcement */}
      {openClosed && (
        <AlertDialog open={openClosed} onOpenChange={setOpenClosed}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-center text-red-500'>
                Closed Announcement
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              {closedAnnouncements.map((announcement: any) => (
                <div key={announcement.id} className='text-center'>
                  <h3 className='font-bold'>{announcement.title}</h3>
                  <p>{announcement.description}</p>
                  <div className='flex gap-5 text-sm mt-3 justify-center'>
                    <span className='ml-2'>
                      From: {announcement.duration.from.toLocaleDateString()}
                    </span>
                    <span className='ml-2'>
                      To: {announcement.duration.to.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogAction
                className='bg-red-500 hover:bg-red-600'
                onClick={() => setOpenClosed(false)}
              >
                Close
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Auto-open Alert Dialog for 'discount' announcement */}
      {openDiscount && (
        <AlertDialog open={openDiscount} onOpenChange={setOpenDiscount}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Discount Available!</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              {discountAnnouncements.map((announcement: any) => (
                <div key={announcement.id}>
                  <h3 className='font-bold'>{announcement.title}</h3>
                  <p>{announcement.description}</p>
                </div>
              ))}
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setOpenDiscount(false)}>
                Close
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
