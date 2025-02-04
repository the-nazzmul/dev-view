"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { toast } from "@/hooks/use-toast";

const DashboardPage = () => {
  const users = useQuery(api.users.getUsers);
  const interview = useQuery(api.interviews.getAllInterviews);
  const updateStatus = useMutation(api.interviews.updateInterviewStatus);

  const handleStatusUpdate = async (
    interviewId: Id<"interviews">,
    status: string
  ) => {
    try {
      await updateStatus({ id: interviewId, status });
      toast({ title: `Interview marked as ${status}` });
    } catch (err) {
      console.log(err);
      toast({ variant: "destructive", title: "Failed to update status" });
    }
  };

  return <div>DashboardPage</div>;
};

export default DashboardPage;
