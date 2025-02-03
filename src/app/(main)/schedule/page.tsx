"use client";

import LoaderComponent from "@/components/LoaderComponent";
import { useUserRole } from "@/hooks/useUserRole";
import { useRouter } from "next/navigation";
import InterviewScheduleCompnent from "./_component/InterviewScheduleCompnent";

const SchedulePage = () => {
  const router = useRouter();

  const { isInterviewer, isLoading } = useUserRole();

  if (isLoading) return <LoaderComponent />;
  if (!isInterviewer) return router.push("/");

  return <InterviewScheduleCompnent />;
};

export default SchedulePage;
