"use client";

import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";

export default function Home() {
  const { isInterviewer, isCandidate, isLoading, userData } = useUserRole();

  const handleQuickAction = (title: string) => {};

  return (
    <div className="container max-w-7xl mx-auto p-6">
      <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
        <h1 className="text-4xl font-bold accent-bg-for-text">
          Welcome back {userData?.name}!
        </h1>
        <p className="text-muted-foregorund mt-2">
          {isLoading
            ? ""
            : isInterviewer
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
        </div>
      ) : (
        <div>Candidate view</div>
      )}
    </div>
  );
}
