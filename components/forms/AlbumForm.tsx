"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAlbum, deleteAlbum, updateAlbum } from "@/server/actions/albums";
import { AlbumFormSchema } from "@/server/schema/albums";
import { ChangeEvent, useState, useTransition, memo } from "react";
import { Textarea } from "../ui/textarea";
import { createImageUrl, deleteImage } from "@/server/actions/images";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Loader2, Image as ImageIcon, Trash2 } from "lucide-react";
import { z } from "zod";
import Link from "next/link";

interface AlbumFormProps {
  album?: {
    id: string;
    title: string;
    description: string;
    albumOrder: number;
    imageUrl: string;
  };
}

const AlbumForm = memo(function AlbumForm({ album }: AlbumFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl =
    searchParams.get("redirect") ||
    (album ? `/album/${album.id}` : "/dashboard");

  const [isDeletePending, startDeleteTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = async (data: z.infer<typeof AlbumFormSchema>) => {
    const action =
      album == null ? createAlbum : updateAlbum.bind(null, album.id);
    try {
      if (album && file) {
        if (
          album.imageUrl !==
          "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"
        ) {
          await deleteImage(album.imageUrl, album.id, false);
        }

        const fileName = file.name.replaceAll(" ", "_");
        const { uploadUrl, publicUrl } = await createImageUrl(
          fileName,
          file.type,
          album.id
        );

        const uploadResponse = await fetch(uploadUrl, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });
        if (!uploadResponse.ok) {
          throw new Error("Failed to upload file to storage.");
        }
        data.imageUrl = publicUrl;
      }
      await action(data);
      setFile(null);
      router.push(returnUrl);
      toast.success(`Album ${album ? "edited" : "created"} successfully!`);
    } catch (error: unknown) {
      form.setError("root", {
        message: `There was an error saving your album ${
          error instanceof Error ? error.message : String(error)
        }`,
      });
    }
  };

  const form = useForm<z.infer<typeof AlbumFormSchema>>({
    resolver: zodResolver(AlbumFormSchema),
    defaultValues: album
      ? {
          ...album,
        }
      : {
          title: "",
          description: "",
          albumOrder: 1,
          imageUrl:
            "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg",
        },
  });

  const { isDirty } = form.formState;

  const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        form.setError("root", {
          message: "File is larger than 10MB.",
        });
      } else if (!file.type.startsWith("image/")) {
        form.setError("root", {
          message: "Invalid file type. Please upload an image.",
        });
      } else {
        setFile(file);
        form.setValue("imageUrl", file.name, { shouldDirty: true });
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <div className="bg-gradient-to-br from-slate-800/60 via-blue-900/30 to-indigo-900/40 backdrop-blur-xl border border-slate-600/50 rounded-2xl shadow-2xl shadow-slate-900/50 p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-100 drop-shadow-lg">
            {album ? "Edit Album" : "Create New Album"}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg mt-2">
            {album
              ? "Update your album's details and cover image."
              : "Create a new album to organize and showcase your photos."}
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Show root error if any */}
            {form.formState.errors.root && (
              <div className="p-4 rounded-lg bg-red-600/10 border border-red-500/30 text-red-300 text-sm">
                {form.formState.errors.root.message}
              </div>
            )}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200 text-base font-semibold">
                    Album Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Album title (e.g. Summer Vacation)"
                      className="bg-slate-800/50 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.3)] text-base transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-slate-400 text-sm">
                    Give your album a clear, descriptive name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200 text-base font-semibold">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What is this album about?"
                      className="resize-none bg-slate-800/50 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/50 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.3)] text-base transition-all duration-200"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-slate-400 text-sm">
                    Briefly describe the album&lsquo;s content or purpose.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {album && (
              <FormField
                control={form.control}
                name="imageUrl"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-slate-200 text-base font-semibold">
                      Album Cover
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="bg-slate-800/50 border-slate-600/50 text-slate-100 file:bg-slate-800/50 file:border-slate-600/50 file:text-slate-100 file:rounded file:px-2 sm:px-3 file:py-1 file:mr-2 sm:mr-3 text-base transition-all duration-200"
                        />
                        {file && (
                          <span className="text-slate-400 text-xs ml-2">
                            {file.name}
                          </span>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription className="text-slate-400 text-sm">
                      Choose a cover image for your album (optional).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="albumOrder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200 text-base font-semibold">
                    Display Order
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      className="bg-slate-800/50 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/50 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.3)] text-base transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-slate-400 text-sm">
                    Lower numbers appear first in your album list.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                disabled={form.formState.isSubmitting || !isDirty}
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-slate-100 shadow-lg text-base font-semibold py-3 transition-all duration-200 flex items-center justify-center min-w-0"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2 flex-shrink-0" />
                    <span className="truncate">
                      {album ? "Updating..." : "Creating..."}
                    </span>
                  </>
                ) : (
                  <>
                    <ImageIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span className="truncate">
                      {album ? "Update" : "Create"}
                    </span>
                  </>
                )}
              </Button>

              <Button
                disabled={form.formState.isSubmitting}
                type="button"
                asChild
                variant="outline"
                className="flex-1 border-slate-600/50 text-slate-100 hover:bg-slate-700/10 text-base font-semibold min-w-0"
              >
                <Link
                  href={returnUrl}
                  className="flex items-center justify-center"
                >
                  <span className="truncate">Cancel</span>
                </Link>
              </Button>

              {/* Delete Button (only shows if editing existing album) */}
              {album && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-slate-600/50 text-slate-100 hover:bg-slate-700/10 text-base font-semibold min-w-0"
                      disabled={isDeletePending}
                    >
                      <Trash2 className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span className="truncate">Delete</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-slate-800/50 backdrop-blur-xl border-slate-600/50">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-slate-100 text-lg sm:text-xl">
                        Are you sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-400 text-sm sm:text-base">
                        This action cannot be undone. This will permanently
                        delete this album and all its images.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border-slate-600/50 text-slate-100 hover:bg-slate-700/10 text-sm">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700 text-slate-100 text-sm"
                        disabled={
                          isDeletePending || form.formState.isSubmitting
                        }
                        onClick={() => {
                          startDeleteTransition(async () => {
                            try {
                              await deleteAlbum(album.id);
                              router.push("/dashboard");
                              toast.success("Album has been deleted");
                            } catch (error: unknown) {
                              form.setError("root", {
                                message: `There was an error deleting your album: ${
                                  error instanceof Error
                                    ? error.message
                                    : String(error)
                                }`,
                              });
                            }
                          });
                        }}
                      >
                        Delete Album
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
});

export default AlbumForm;
