import { Button } from "./ui/button";
import Link from "next/link";

interface FooterProps {
  isPrivacyPage?: boolean;
}

export default function Footer({ isPrivacyPage = false }: FooterProps) {
  return (
    <footer
      className={`relative z-10 border-t border-white/10 py-2 sm:py-3 px-4 sm:px-6 bg-white/5 backdrop-blur-xl mt-auto ${
        isPrivacyPage
          ? ""
          : "opacity-0 animate-[fadeIn_1s_ease-out_1.8s_forwards]"
      }`}
    >
      <div className="flex flex-row items-center justify-between gap-x-4 text-white/60 text-xs w-full">
        <p className="text-left">&copy; 2025 - Aakash Kalmady</p>
        <div className="flex items-center gap-4">
          {isPrivacyPage && (
            <Button
              variant="link"
              asChild
              size="sm"
              className="text-white/60 hover:text-white text-xs h-6 px-2 transition-all duration-300 hover:scale-105"
            >
              <Link href="/">Home</Link>
            </Button>
          )}
          <Button
            variant="link"
            asChild
            size="sm"
            className="text-white/60 hover:text-white text-xs h-6 px-2 transition-all duration-300 hover:scale-105"
          >
            <Link href="/privacy">Privacy Policy</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
