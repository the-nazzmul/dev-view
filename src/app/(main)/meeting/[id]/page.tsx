"use client";

import LoaderComponent from "@/components/LoaderComponent";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import useGetCallById from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { NoiseCancellation } from "@stream-io/audio-filters-web";
import {
  BackgroundFiltersProvider,
  NoiseCancellationProvider,
  StreamCall,
  StreamTheme,
} from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

const MeetingPage = () => {
  const { id } = useParams();
  const { isLoaded } = useUser();
  const noiseCancellation = useMemo(() => new NoiseCancellation(), []);

  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState<boolean>(false);

  if (!isLoaded || isCallLoading) return <LoaderComponent />;

  if (!call) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold">Meeting not found</p>
      </div>
    );
  }

  return (
    <StreamCall call={call}>
      <BackgroundFiltersProvider
        backgroundFilter="blur"
        backgroundImages={[
          "https://dev-view.vercel.app/bg/library.jpg",
          "https://dev-view.vercel.app/bg/fireplace.jpg",
          "https://dev-view.vercel.app/bg/living-room.jpg",
          "https://dev-view.vercel.app/bg/office.jpg",
        ]}
      >
        <NoiseCancellationProvider noiseCancellation={noiseCancellation}>
          <StreamTheme>
            {!isSetupComplete ? (
              <MeetingSetup onSetupComplete={() => setIsSetupComplete(true)} />
            ) : (
              <MeetingRoom />
            )}
          </StreamTheme>
        </NoiseCancellationProvider>
      </BackgroundFiltersProvider>
    </StreamCall>
  );
};

export default MeetingPage;
