import { useBackgroundFilters } from "@stream-io/video-react-sdk";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { WandSparklesIcon } from "lucide-react";

export const BackgroundSettings = () => {
  const {
    disableBackgroundFilter, // disables the filter
    applyBackgroundBlurFilter, // applies the blur filter
  } = useBackgroundFilters();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="size-10">
          <WandSparklesIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={disableBackgroundFilter}>
          Turn Off
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyBackgroundBlurFilter("high")}>
          High
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => applyBackgroundBlurFilter("medium")}>
          Medium
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => applyBackgroundBlurFilter("low")}>
          Low
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
