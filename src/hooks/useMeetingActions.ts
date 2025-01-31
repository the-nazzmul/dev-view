import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

const useMeetingActions = () => {
  const router = useRouter();
  const client = useStreamVideoClient();
  const { toast } = useToast();

  const createInstantMeeting = async () => {
    if (!client) return;

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      await call.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
          custom: {
            description: "Instant Meeting",
          },
        },
      });

      router.push(`/meeting/${call.id}`);
      toast({
        title: "Success!",
        description: "Meeting created",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Failed to create meeting",
      });
    }
  };

  const joinMeeting = (callId: string) => {
    if (!client)
      return toast({
        variant: "destructive",
        title: "Failed to join meeting! Please try again.",
      });
    router.push(`/meeting/${callId}`);
  };

  return { createInstantMeeting, joinMeeting };
};

export default useMeetingActions;
