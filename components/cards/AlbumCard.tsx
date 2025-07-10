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
    <Card className="group bg-white/10 border border-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:border-blue-400/40 transition-transform duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-white text-base sm:text-lg font-semibold truncate">
              {props.title}
            </CardTitle>
            {props.description && (
              <CardDescription className="text-white/60 text-xs sm:text-sm mt-1 line-clamp-2">
                {props.description}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-blue-700/30 via-purple-700/20 to-slate-900/40 -mx-6 -mt-6">
          {isDefaultImage ? (
            <div className="absolute inset-0 flex items-center justify-center text-white/30 text-4xl font-bold select-none">
              <span className="opacity-80">📷</span>
            </div>
          ) : (
            <Image
              src={props.imageUrl}
              alt={props.title}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
          {/* Overlay gradient for hover effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          {/* Floating edit button overlay for private albums */}
          {props.isPrivate && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  asChild
                  className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 text-white shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/20 backdrop-blur-xl"
                  style={{ boxShadow: "0 2px 12px 0 rgba(80,80,255,0.10)" }}
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
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs sm:text-sm shadow-md"
                asChild
              >
                <Link
                  href={
                    props.isPrivate
                      ? `/album/${props.albumId}`
                      : `/u/${props.username}/${props.albumId}`
                  }
                >
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  View Album
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open album to view photos</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardFooter>
    </Card>
  );
});

export default AlbumCard;
