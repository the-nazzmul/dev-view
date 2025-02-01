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
    applyBackgroundImageFilter, // applies the image filter
    backgroundImages, // list of available images
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
          High Blur
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => applyBackgroundBlurFilter("medium")}>
          Medium Blur
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => applyBackgroundBlurFilter("low")}>
          Low Blur
        </DropdownMenuItem>
        <ul>
          {backgroundImages!.map((image, index) => (
            <DropdownMenuItem
              key={image}
              onClick={() => applyBackgroundImageFilter(image)}
            >
              {"Background" + " " + `${index + 1}`}
            </DropdownMenuItem>
          ))}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
