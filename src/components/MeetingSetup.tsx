"use client";

import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { CameraIcon, MicIcon, SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

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

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background/95">
      <div className="w-full max-x-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Preview container*/}
          <Card className="md:col-span-1 p-6 flex flex-col">
            <div>
              <h1 className="text-xl font-semibold mb-1">Camera Preview</h1>
              <p className="text-sm text-muted-foreground">
                Make sure you look good!
              </p>
            </div>
            {/* preview */}
            <div className="mt-4 flex-1 min-h-[400px] rounded-xl overflow-hidden bg-muted/50 border relative">
              <div className="absolute inset-0">
                <VideoPreview className="h-full w-full" />
              </div>
            </div>
          </Card>
          {/* Controls */}
          <Card className="md:col-span-1 p-6">
            <div className="h-full flex flex-col">
              {/* Meeting details */}
              <div>
                <h2 className="text-xl font-semibold mb-1">Meeting Details</h2>
                <p className="text-sm text-muted-foreground break-all">
                  {call.id}
                </p>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-6 mt-8">
                  {/* Camera control */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CameraIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Camera</p>
                        <p className="text-sm text-muted-foreground">
                          {isCameraDisabled ? "Off" : "On"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={!isCameraDisabled}
                      onCheckedChange={(checked) =>
                        setIsCameraDisabled(!checked)
                      }
                    />
                  </div>
                  {/* Microphone control */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MicIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Microphone</p>
                        <p className="text-sm text-muted-foreground">
                          {isMicDisabled ? "Off" : "On"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={!isMicDisabled}
                      onCheckedChange={(checked) => setIsMicDisabled(!checked)}
                    />
                  </div>
                  {/* Device Settings */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <SettingsIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Settings</p>
                        <p className="text-sm text-muted-foreground">
                          Configure devices
                        </p>
                      </div>
                    </div>
                    <DeviceSettings />
                  </div>
                </div>
                {/* Join Button */}
                <div className="space-y-3 mt-8">
                  <Button className="w-full" size="lg" onClick={handleJoin}>
                    Join Meeting
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Remember, interview is just a conversation for negotiation.
                    Take it easy and try to give your best! 🎉
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MeetingSetup;
