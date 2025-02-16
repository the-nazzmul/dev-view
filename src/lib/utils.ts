/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import {
  addMinutes,
  intervalToDuration,
  isAfter,
  isBefore,
  isWithinInterval,
} from "date-fns";
import { twMerge } from "tailwind-merge";
import { Doc } from "../../convex/_generated/dataModel";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Interview = Doc<"interviews">;
type User = Doc<"users">;

export const groupInterviews = async (
  interviews: Interview[],
  updateStatus: any
) => {
  if (!interviews || interviews.length === 0) return {};

  const now = new Date();
  const updates: Promise<void>[] = [];

  const grouped: Record<string, Interview[]> = {
    succeeded: [],
    failed: [],
    completed: [],
    upcoming: [],
  };

  for (const interview of interviews) {
    const endTime = new Date(interview.endTime!);

    if (interview.status === "succeeded") {
      grouped.succeeded.push(interview);
    } else if (interview.status === "failed") {
      grouped.failed.push(interview);
    } else if (isBefore(endTime, now)) {
      if (interview.status !== "completed") {
        updates.push(updateStatus({ id: interview._id, status: "completed" }));
        grouped.completed.push({ ...interview, status: "completed" });
      } else {
        grouped.completed.push(interview);
      }
    } else if (isAfter(endTime, now)) {
      grouped.upcoming.push(interview);
    }
  }

  // Execute all status updates for completed interviews
  await Promise.all(updates);

  return grouped;
};

export const getCandidateInfo = (users: User[], candidateId: string) => {
  const candidate = users?.find((user) => user.clerkId === candidateId);
  return {
    name: candidate?.name || "Unknown Candidate",
    image: candidate?.image || "",
    initials:
      candidate?.name
        ?.split(" ")
        .map((n) => n[0])
        .join("") || "UC",
  };
};

export const getInterviewerInfo = (users: User[], interviewerId: string) => {
  const interviewer = users?.find((user) => user.clerkId === interviewerId);
  return {
    name: interviewer?.name || "Unknown Interviewer",
    image: interviewer?.image,
    initials:
      interviewer?.name
        ?.split(" ")
        .map((n) => n[0])
        .join("") || "UI",
  };
};

export const calculateRecordingDuration = (
  startTime: string,
  endTime: string
) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const duration = intervalToDuration({ start, end });

  if (duration.hours && duration.hours > 0) {
    return `${duration.hours}:${String(duration.minutes).padStart(2, "0")}:${String(
      duration.seconds
    ).padStart(2, "0")}`;
  }

  if (duration.minutes && duration.minutes > 0) {
    return `${duration.minutes}:${String(duration.seconds).padStart(2, "0")}`;
  }

  return `${duration.seconds} seconds`;
};

export const getMeetingStatus = (interview: Interview) => {
  const now = new Date();
  const interviewStartTime = interview.startTime;
  const endTime = addMinutes(interviewStartTime, interview.duration);
  const fiveMinutesBeforeStart = addMinutes(interviewStartTime, -5);

  if (
    isWithinInterval(now, {
      start: fiveMinutesBeforeStart,
      end: interviewStartTime,
    })
  ) {
    return "joinable";
  }
  if (
    interview.status === "completed" ||
    interview.status === "failed" ||
    interview.status === "succeeded"
  )
    return "completed";
  if (isWithinInterval(now, { start: interviewStartTime, end: endTime }))
    return "live";
  if (isBefore(now, interviewStartTime)) return "upcoming";
  return "completed";
};

// if (!interviews) return {};

// const updates: Promise<void>[] = [];

// const grouped = interviews.reduce((acc: any, interview: Interview) => {
//   const date = new Date(interview.endTime!);
//   const now = new Date();

//   if (interview.status === "succeeded") {
//     acc.succeeded = [...(acc.succeeded || []), interview];
//   } else if (interview.status === "failed") {
//     acc.failed = [...(acc.failed || []), interview];
//   } else if (isBefore(date, now)) {
//     updates.push(updateStatus({ id: interview._id, status: "completed" }));
//     acc.completed = [...(acc.completed || []), interview];
//   } else if (isAfter(date, now)) {
//     acc.upcoming = [...(acc.upcoming || []), interview];
//   }

//   return acc;
// }, {});

// await Promise.all(updates);

// return grouped;
