"use server"

import { AnnouncementSchema } from "@/lib/validateForm"
import Announcement from "@/models/announcement"
import { z } from "zod"

export const createAnnouncement = async (values: z.infer<typeof AnnouncementSchema>) => {
  try {
      // Check if there's already an active announcement
      const activeAnnouncement = await Announcement.findOne({
          status: "active",
          "duration.from": { $lte: new Date() },  // The 'from' date is less than or equal to today's date
          "duration.to": { $gte: new Date() }     // The 'to' date is greater than or equal to today's date
      });

      // If there is an active announcement, prevent creation
      if (activeAnnouncement) {
          return { success: false, error: "An active announcement already exists." };
      }

      // Create the new announcement if no active ones exist
      const newAnnouncement = await Announcement.create({
          title: values.title,
          description: values.description,
          type: values.type,
          duration: {
              from: values.duration.from,
              to: values.duration.to,
          },
          status: values.status,
      });

      return { success: true, data: newAnnouncement };

  } catch (error) {
      return { success: false, error: "Something went wrong creating announcement" };
  }
};


export const getAllAnnouncements = async() => {
    try {
        const announcements = await Announcement.find()
        return announcements
    }
    catch(error) {
    return {success: false, error: 'Something went wrong'}
    }
} 


export const getAnnouncementToday = async () => {
    try {
      // Get today's date in "YYYY-MM-DD" format
      const today = new Date().toISOString().split('T')[0]
  
      // Query MongoDB for 'closed' type announcements where the 'from' date is today
      const announcementsToday = await Announcement.find({
        'duration.from': {
          $gte: new Date(today + 'T00:00:00.000Z'), // Ensure 'from' date is today
          $lt: new Date(today + 'T23:59:59.999Z'), // Ensure it's before the end of today
        },
      }).exec();
      // Return the fetched announcements
      return announcementsToday;
    } catch (error) {
      console.error('Error fetching closed announcements today:', error)
      throw new Error('Could not fetch closed announcements')
    }
  }

  export const getAnnouncementById = async(announcementId: string) => {
    const announcement = await Announcement.findById(announcementId) 
    if(!announcement) {
        return {success: false, error: 'Could not find announcement'}
    }
    return {success: true, data: announcement}
  }

  export const editAnnouncementById = async (announcementId: string, values: z.infer<typeof AnnouncementSchema>) => {
    try {
        const announcement = await Announcement.findByIdAndUpdate(announcementId, {
            title: values.title,
            description: values.description,
            type: values.type,
            duration: {
                from: values.duration.from,
                to: values.duration.to,
            },
            status: values.status
        })

        return {success: true, data: announcement}
    } catch (error) {
        return {success: false, error: "Something went wrong"}
    }
  }

  export const deleteAnnouncementById = async(announcementId: string) => {
    const announcement = await Announcement.findByIdAndDelete(announcementId)
    if(!announcement) {
      return {success: false, error: 'Could not find announcement'}
    }
    return {success: true, announcement}
  }