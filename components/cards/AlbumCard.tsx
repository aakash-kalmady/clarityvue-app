import { Button } from "../ui/button";
import { SquarePen, Eye } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

interface AlbumCardProps {
  title: string;
  description: string | null;
  albumId: string;
  imageUrl: string;
  isPrivate: boolean;
  username: string;
}

const AlbumCard = memo(function AlbumCard(props: AlbumCardProps) {
  const isDefaultImage =
    !props.imageUrl || props.imageUrl.includes("default-ui-image-placeholder");
  return (
    <Card className="group bg-gradient-to-br from-slate-800/60 via-blue-900/30 to-indigo-900/40 border border-slate-600/50 backdrop-blur-2xl shadow-xl hover:shadow-blue-500/20 hover:scale-[1.02] hover:border-slate-500/70 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-slate-100 text-base sm:text-lg font-semibold truncate">
              {props.title}
            </CardTitle>
            {props.description && (
              <CardDescription className="text-slate-300 text-sm mt-1 line-clamp-2">
                {props.description}
              </CardDescription>
            )}
          </div>
          {/* Edit button for private albums - always visible on mobile */}
          {props.isPrivate && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  asChild
                  className="flex-shrink-0 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 shadow-lg p-2 border border-slate-600/50 backdrop-blur-xl transition-all duration-200 hover:scale-110"
                  style={{ boxShadow: "0 2px 12px 0 rgba(59,130,246,0.20)" }}
                >
                  <Link
                    href={`/album/edit/${props.albumId}?redirect=/dashboard`}
                  >
                    <SquarePen className="w-4 h-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Album</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-800/60 via-blue-900/30 to-indigo-900/40 -mx-6 -mt-6">
          {isDefaultImage ? (
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-4xl font-bold select-none">
              <span className="opacity-80">📷</span>
            </div>
          ) : (
            <Image
              src={props.imageUrl}
              alt={props.title}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
              quality={75}
            />
          )}
          {/* Overlay gradient for hover effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          <Button
            className="flex-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-slate-100 text-sm shadow-md"
            asChild
          >
            <Link
              href={
                props.isPrivate
                  ? `/album/${props.albumId}`
                  : `/u/${props.username}/${props.albumId}`
              }
            >
              <Eye className="w-4 h-4 mr-2" />
              View Album
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
});

export default AlbumCard;
