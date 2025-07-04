import { Loader2 } from "lucide-react";

export default function Spinner() {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black z-100">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />;
    </div>
  );
}
