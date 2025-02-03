"use client";

import useGetCalls from "@/hooks/useGetCalls";

const RecordingsPage = () => {
  const { calls, isLoading } = useGetCalls();
  return <div>RecordingsPage</div>;
};

export default RecordingsPage;
