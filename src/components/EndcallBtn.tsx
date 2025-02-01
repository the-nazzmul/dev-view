import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

const EndcallBtn = () => {
  const call = useCall();
  const router = useRouter();
  const { toast } = useToast();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const updateInterviewStatus = useMutation(
    api.interviews.updateInterviewStatus
  );

  const interview = useQuery(api.interviews.getInterviewByStreamCallId, {
    streamCallId: call?.id || "",
  });

  if (!call || !interview) return null;

  const isMeetingOwner = localParticipant?.userId === call.state.createdBy?.id;

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    try {
      await call.endCall();
      await updateInterviewStatus({ id: interview._id, status: "completed" });
      router.push("/");
      toast({
        title: "Meeting ended for everyone",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to end the meeting",
      });
    }
  };

  return (
    <Button variant="destructive" onClick={endCall}>
      End Meeting
    </Button>
  );
};

export default EndcallBtn;
