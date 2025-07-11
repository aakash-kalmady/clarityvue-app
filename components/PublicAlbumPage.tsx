import PublicImageCard from "./cards/PublicImageCard";
import { Camera, Sparkles, Image as ImageIcon } from "lucide-react";
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
}

interface PublicAlbumPageProps {
  album: Album;
  images: Image[];
}

export default function PublicAlbumPage({
  album,
  images,
}: PublicAlbumPageProps) {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header Section */}
      <div className="relative transition-all duration-1000 delay-200 opacity-0 animate-[fadeIn_1s_ease-out_0.2s_forwards]">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/40 via-indigo-600/30 to-purple-600/20 backdrop-blur-2xl border border-white/20 shadow-2xl" />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 p-6 rounded-2xl z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-white/20">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
                    {album.title}
                  </h1>
                </div>
                {album.description && (
                  <p className="text-white/70 text-base mt-1">
                    {album.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20">
              <ImageIcon className="w-4 h-4 text-white/60" />
              <span className="text-white/80 text-base font-medium">
                {images.length} photo{images.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="transition-all duration-1000 delay-400 opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-300 animate-pulse" />
            Gallery
          </h2>
          {images.length > 0 && (
            <p className="text-white/60 text-sm">
              {images.length} photo{images.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {images.length < 1 ? (
          <Card className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 border-white/20 backdrop-blur-xl transition-all duration-300 hover:scale-[1.01]">
            <CardContent className="pt-8 sm:pt-12 pb-8 sm:pb-12">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full flex items-center justify-center mx-auto border border-white/20">
                  <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white/70" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    No photos yet
                  </h3>
                  <p className="text-white/60 mb-6 max-w-md mx-auto text-base">
                    This album doesn&apos;t have any photos yet. Check back
                    later to see the owner&apos;s beautiful collection.
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
                className="transition-all duration-500 opacity-0 translate-y-8"
                style={{
                  animation: `fadeIn 0.8s ease-out ${
                    0.6 + index * 0.1
                  }s forwards`,
                }}
              >
                <PublicImageCard image={image} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
