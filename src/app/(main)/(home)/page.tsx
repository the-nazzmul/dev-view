/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS, QUICK_ACTIONS_FOR_CANDIDATE } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/MeetingModal";
import LoaderComponent from "@/components/LoaderComponent";
import { Loader2Icon } from "lucide-react";
import MeetingCard from "@/components/MeetingCard";

export default function Home() {
  const router = useRouter();

  const { isInterviewer, isLoading, userData } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };

  if (isLoading) return <LoaderComponent />;

  return (
    <div className="container max-w-7xl mx-auto p-6">
      <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
        <h1 className="text-4xl font-bold accent-bg-for-text">
          Welcome back {userData?.name}!
        </h1>
        <p className="text-muted-foregorund mt-2">
          {isInterviewer
            ? "Manage your interviews and review candidates effectively"
            : "Access your upcoming interviews and preparations"}
        </p>
      </div>
      {isInterviewer ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUICK_ACTIONS.map((action) => (
            <ActionCard
              key={action.title}
              action={action}
              onClick={() => handleQuickAction(action.title)}
            />
          ))}
          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
            isJoinMeeting={modalType === "join"}
          />
        </div>
      ) : (
        <>
          <div>
            <h1 className="text-3xl font-bold">Your Interview</h1>
            <p className="text-muted-foreground mt-1">
              View and join your scheduled interviews
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {QUICK_ACTIONS_FOR_CANDIDATE.map((action) => (
              <ActionCard
                key={action.title}
                action={action}
                onClick={() => handleQuickAction(action.title)}
              />
            ))}
            <MeetingModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
              isJoinMeeting={modalType === "join"}
            />
          </div>
          <div className="mt-8">
            {interviews === undefined ? (
              <div className="flex justify-center py-12">
                <Loader2Icon className="size-8 animate-spin text-muted-foreground" />
              </div>
            ) : interviews.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold">
                  Your Scheduled interviews
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
                  <>
                    {interviews.map((interview) => (
                      <MeetingCard key={interview._id} interview={interview} />
                    ))}
                  </>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                You have no scheduled interviews
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
