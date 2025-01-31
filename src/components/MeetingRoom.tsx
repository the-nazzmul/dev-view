import { CallingState, useCallStateHooks } from "@stream-io/video-react-sdk";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";

const MeetingRoom = () => {
  const router = useRouter();
  const [layout, setLayout] = useState<"grid" | "speaker">("speaker");
  const [showParticipants, setShowParticipants] = useState<boolean>(false);

  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoaderIcon className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <ResizablePanelGroup direction="horizontal">
      {/* Video call */}
      <ResizablePanel
        defaultSize={50}
        minSize={25}
        maxSize={75}
        className="relative"
      >
        Video
      </ResizablePanel>
      {/* handle to resize components */}
      <ResizableHandle withHandle />
      {/* Code editor */}
      <ResizablePanel defaultSize={50} minSize={25}>
        <h1>Code editor</h1>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default MeetingRoom;
