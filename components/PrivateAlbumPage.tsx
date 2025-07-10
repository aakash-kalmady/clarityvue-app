import { Button } from "@/components/ui/button";
import { SquarePen, Camera, Sparkles, Upload, Eye } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import PrivateImageCard from "./cards/PrivateImageCard";
import Link from "next/link";
import ImageUploadBox from "@/components/ImageUploadBox";
import { Card, CardContent } from "./ui/card";

interface Image {
  id: string;
  imageUrl: string;
  altText: string;
  caption: string;
  imageOrder: number;
}

interface Album {
  id: string;
  title: string;
  description: string;
  albumOrder: number;
  username: string;
}

interface PrivateAlbumPageProps {
  album: Album;
  images: Image[];
}

export default function PrivateAlbumPage({
  album,
  images,
}: PrivateAlbumPageProps) {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header Section */}
      <div className="relative transition-all duration-1000 delay-200 animate-in slide-in-from-bottom-4 fade-in">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-900/80 via-blue-900/40 to-indigo-900/60 backdrop-blur-2xl border border-slate-700/50 shadow-2xl" />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 p-6 rounded-2xl z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-slate-600/50">
                <Camera className="w-6 h-6 text-slate-200" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 drop-shadow-lg">
                    {album.title}
                  </h1>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-slate-300 hover:text-slate-100 hover:bg-slate-700/20 transition-all duration-300 hover:scale-105"
                      >
                        <Link
                          href={`/album/edit/${album.id}?redirect=/album/${album.id}`}
                        >
                          <SquarePen className="w-4 h-4" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit Album</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                {album.description && (
                  <p className="text-slate-300 text-sm sm:text-base mt-1">
                    {album.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="text-sm border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-slate-200 transition-all duration-300 hover:scale-105"
                >
                  <Link href={`/u/${album.username}/${album.id}`}>
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    View Album
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View album as others see it</p>
              </TooltipContent>
            </Tooltip>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-600/50">
              <Upload className="w-4 h-4 text-slate-400" />
              <span className="text-slate-200 text-sm font-medium">
                {images.length} photo{images.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Box */}
      <div className="transition-all duration-1000 delay-400 animate-in slide-in-from-bottom-4 fade-in">
        <ImageUploadBox albumId={album.id} />
      </div>

      {/* Images Section */}
      <div className="transition-all duration-1000 delay-600 animate-in slide-in-from-bottom-4 fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-300 animate-pulse" />
            Your Photos
          </h2>
          {images.length > 0 && (
            <p className="text-slate-400 text-xs sm:text-sm">
              {images.length} photo{images.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {images.length < 1 ? (
          <Card className="bg-gradient-to-br from-slate-800/60 via-blue-900/30 to-indigo-900/40 border-slate-600/50 backdrop-blur-xl transition-all duration-300 hover:scale-[1.01]">
            <CardContent className="pt-8 sm:pt-12 pb-8 sm:pb-12">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-full flex items-center justify-center mx-auto border border-slate-600/50">
                  <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-slate-300" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-200 mb-2">
                    No photos yet
                  </h3>
                  <p className="text-slate-400 mb-6 max-w-md mx-auto text-sm sm:text-base">
                    Upload your first photo to start building your album. Drag
                    and drop images or click the upload area above.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`transition-all duration-700 delay-${
                  800 + index * 50
                } animate-in slide-in-from-bottom-4 fade-in`}
              >
                <PrivateImageCard image={image} albumId={album.id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
