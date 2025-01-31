"use client";

import { useCall } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const MeetingSetup = ({ onSetupComplete }: { onSetupComplete: () => void }) => {
  const [isCameraDisabled, setIsCameraDisabled] = useState<boolean>(true);
  const [isMicDisabled, setIsMicDisabled] = useState<boolean>(false);

  const call = useCall();

  if (!call) return null;

  useEffect(() => {
    if (isCameraDisabled) {
      call.camera.disable();
    } else {
      call.camera.enable();
    }
  }, [isCameraDisabled, call.camera]);

  useEffect(() => {
    if (isMicDisabled) {
      call.microphone.disable();
    } else {
      call.microphone.enable();
    }
  }, [isMicDisabled, call.microphone]);

  const handleJoin = async () => {
    await call.join();
    onSetupComplete();
  };

  return <div>MeetingSetup</div>;
};

export default MeetingSetup;
