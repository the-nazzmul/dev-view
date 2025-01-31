import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { LayoutListIcon, LoaderIcon, Users, UsersIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
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
    <div className="h-[calc(100vh-4rem-1px)]">
      <ResizablePanelGroup direction="horizontal">
        {/* Video call */}
        <ResizablePanel
          defaultSize={50}
          minSize={25}
          maxSize={75}
          className="relative"
        >
          {/* Video Layout */}
          <div className="absolute inset-0">
            {layout === "grid" ? <PaginatedGridLayout /> : <SpeakerLayout />}
            {/* Participants list */}
            {showParticipants && (
              <div className="absolute right-0 top-0 h-full w-[300px] bg-background/95 backdrop-blur supports-[backdrop-fi;ter]:bg-background/60">
                <CallParticipantsList
                  onClose={() => setShowParticipants(false)}
                />
              </div>
            )}
          </div>
          {/* Video controls */}
          <div className="absolute bottom-4 left-0 right-0">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 flex-wrap justify-center px-4">
                <CallControls onLeave={() => router.push("/")} />
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="size-10">
                        <LayoutListIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setLayout("grid")}>
                        Grid View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLayout("speaker")}>
                        Speaker View
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setShowParticipants(!showParticipants)}
                  >
                    <UsersIcon className="h-4 w-4" />
                  </Button>
                  <Button>end call</Button>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
        {/* handle to resize components */}
        <ResizableHandle withHandle />
        {/* Code editor */}
        <ResizablePanel defaultSize={50} minSize={25}>
          <h1>Code editor</h1>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MeetingRoom;
