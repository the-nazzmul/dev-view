import { useNoiseCancellation } from "@stream-io/video-react-sdk";
import { Button } from "../ui/button";
import { EarIcon } from "lucide-react";

export const NoiseCancellationBtn = () => {
  const { isSupported, isEnabled, setEnabled } = useNoiseCancellation();
  return (
    <Button
      disabled={!isSupported}
      variant={isEnabled ? "destructive" : "outline"}
      onClick={() => setEnabled(!isEnabled)}
      className="size-10"
    >
      <EarIcon className="size-4" />
    </Button>
  );
};
