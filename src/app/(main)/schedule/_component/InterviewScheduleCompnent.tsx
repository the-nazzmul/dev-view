import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserInfo from "@/components/UserInfo";
import { Loader2Icon, XIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { MEETING_DURATIONS, TIME_SLOTS } from "@/constants";
import MeetingCard from "@/components/MeetingCard";
import { addMinutes } from "date-fns";

const InterviewScheduleCompnent = () => {
  const client = useStreamVideoClient();
  const { user } = useUser();
  const [open, setOpen] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const interviews = useQuery(api.interviews.getAllInterviews) ?? [];
  const users = useQuery(api.users.getUsers) ?? [];
  const createInterview = useMutation(api.interviews.createInterview);

  const candidates = users?.filter((c) => c.role === "candidate");
  const interviewers = users?.filter((c) => c.role === "interviewer");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    time: "09:00",
    duration: 30,
    candidateId: "",
    interviewerIds: user?.id ? [user.id] : [],
  });

  const scheduleMeeting = async () => {
    if (!client || !user) return;
    if (!formData.candidateId || formData.interviewerIds.length === 0) {
      toast({
        variant: "destructive",
        title: "Please select both candidate and at least one interviewer",
      });
      return;
    }

    setIsCreating(true);
    try {
      const {
        title,
        description,
        date,
        time,
        candidateId,
        interviewerIds,
        duration,
      } = formData;

      const [hours, minutes] = time.split(":");
      const meetingDate = new Date(date);
      meetingDate.setHours(parseInt(hours), parseInt(minutes), 0);

      const endTime = addMinutes(meetingDate, duration).getTime();

      const id = crypto.randomUUID();
      const call = client.call("default", id);

      await call.getOrCreate({
        data: {
          starts_at: meetingDate.toISOString(),
          custom: {
            description: title,
            additionalDetails: description,
          },
        },
      });

      await createInterview({
        title,
        description,
        startTime: meetingDate.getTime(),
        duration,
        endTime,
        status: "upcoming",
        streamCallId: id,
        candidateId,
        interviewerIds,
      });

      setOpen(false);
      toast({ title: "Meeting scheduled successfully!" });

      setFormData({
        title: "",
        description: "",
        date: new Date(),
        time: "09:00",
        duration: 30,
        candidateId: "",
        interviewerIds: user?.id ? [user.id] : [],
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreating(false);
    }
  };

  const addInterviewer = (interviewerId: string) => {
    if (!formData.interviewerIds.includes(interviewerId)) {
      setFormData((prev) => ({
        ...prev,
        interviewerIds: [...prev.interviewerIds, interviewerId],
      }));
    }
  };

  const removeInterviewer = (interviewerId: string) => {
    if (interviewerId === user?.id) return;
    setFormData((prev) => ({
      ...prev,
      interviewerIds: prev.interviewerIds.filter((id) => id !== interviewerId),
    }));
  };

  const selectedInterviewers = interviewers?.filter((i) =>
    formData.interviewerIds.includes(i.clerkId)
  );

  const availableInterviewers = interviewers?.filter(
    (i) => !formData.interviewerIds.includes(i.clerkId)
  );

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        {/* Header Information */}
        <div>
          <h1 className="text-3xl font-bold">Interviews</h1>
          <p className="text-muted-foreground mt-1">
            Schedule and manage interviews
          </p>
        </div>
        {/* Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="lg">Schedule Interview</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] h-[calc(100vh-200px)] overflow-auto">
            <DialogHeader>
              <DialogTitle>Schedule Interview</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Interview Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="Interview Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Interview Title"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
              {/* Candidate */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Candidate</label>
                <Select
                  value={formData.candidateId}
                  onValueChange={(candidateId) =>
                    setFormData({ ...formData, candidateId })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select candidate" />
                  </SelectTrigger>
                  <SelectContent>
                    {candidates?.map((candidate) => (
                      <SelectItem
                        key={candidate.clerkId}
                        value={candidate.clerkId}
                      >
                        <UserInfo user={candidate} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Interviewers */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Interviewers</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedInterviewers.map((interviewer) => (
                    <div
                      key={interviewer.clerkId}
                      className="inline-flex items-center gap-2 bg-secondary px-2 py-1 rounded-md text-sm"
                    >
                      <UserInfo user={interviewer} />
                      {interviewer.clerkId !== user?.id && (
                        <button
                          onClick={() => removeInterviewer(interviewer.clerkId)}
                          className="hover:text-destructive transition-colors"
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {availableInterviewers.length > 0 && (
                  <Select onValueChange={addInterviewer}>
                    <SelectTrigger>
                      <SelectValue placeholder="Add interviewer" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableInterviewers.map((interviewer) => (
                        <SelectItem
                          key={interviewer.clerkId}
                          value={interviewer.clerkId}
                        >
                          <UserInfo user={interviewer} />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              {/* Date and Time */}
              <div className="flex gap-4">
                {/* Calendar */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) =>
                      date && setFormData({ ...formData, date })
                    }
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                </div>
                {/* Time and duration */}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Select
                    value={formData.time}
                    onValueChange={(time) => setFormData({ ...formData, time })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Duration */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Minutes</label>
                  <Select
                    value={formData.duration.toString()}
                    onValueChange={(duration) =>
                      setFormData({ ...formData, duration: Number(duration) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {MEETING_DURATIONS.map((duration) => (
                        <SelectItem key={duration} value={String(duration)}>
                          {duration}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* ACTION BUTTONS */}
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={scheduleMeeting} disabled={isCreating}>
                  {isCreating ? (
                    <>
                      <Loader2Icon className="mr-2 size-4 animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    "Schedule Interview"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Loading state and meeting card */}
      {!interviews ? (
        <div className="flex justify-center py-12">
          <Loader2Icon className="size-8 animate-spin text-muted-foreground" />
        </div>
      ) : interviews.length > 0 ? (
        <div className="spacey-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {interviews.map((interview) => (
              <MeetingCard key={interview._id} interview={interview} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No interviews scheduled
        </div>
      )}
    </div>
  );
};

export default InterviewScheduleCompnent;
