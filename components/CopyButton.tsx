import { toast } from "sonner";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function CopyButton({ publicUrl }: { publicUrl: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-1.5 text-xs sm:text-sm font-semibold shadow-md"
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(publicUrl);
            toast.success("Public profile link copied!");
          }}
        >
          Copy public link
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Copy your public profile URL</p>
      </TooltipContent>
    </Tooltip>
  );
}
