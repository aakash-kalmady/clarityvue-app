"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAlbum, deleteAlbum, updateAlbum } from "@/server/actions/albums";
import { AlbumFormSchema } from "@/server/schema/albums";
import { ChangeEvent, useState, useTransition } from "react";
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
import { Loader2 } from "lucide-react";
import { z } from "zod";
import Link from "next/link";

export default function AlbumForm({
  album, // Destructure the `event` object from the props
}: {
  // Define the shape (TypeScript type) of the expected props
  album?: {
    // Optional `event` object (might be undefined if creating a new event)
    id: string;
    title: string; // Unique identifier for the event
    description: string; // Name of the event
    albumOrder: number; // Optional description of the event
    imageUrl: string;
  };
}) {
  const router = useRouter();
  const searchParams = useSearchParams(); // Get the search params object
  const returnUrl =
    searchParams.get("redirect") ||
    (album ? `/album/${album.id}` : "/dashboard");

  const [isDeletePending, startDeleteTransition] = useTransition();
  const [invalidImage, setInvalidImage] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = async (data: z.infer<typeof AlbumFormSchema>) => {
    const action =
      album == null ? createAlbum : updateAlbum.bind(null, album.id);
    try {
      // 3. Get a pre-signed URL
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

        // 4. Upload the file to the storage provider
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
          // If `event` is provided (edit mode), spread its existing properties as default values
          ...album,
        }
      : {
          // If `event` is not provided (create mode), use these fallback defaults
          title: "", // New events are active by default
          description: "", // Default duration is 30 minutes
          albumOrder: 1, // Ensure controlled input: default to empty string
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
        setInvalidImage(true);
      } else if (!file.type.startsWith("image/")) {
        form.setError("root", {
          message: "Invalid file type. Please upload an image.",
        });
        setInvalidImage(true);
      } else {
        setInvalidImage(false);
        setFile(file);
        form.setValue("imageUrl", file.name, { shouldDirty: true });
      }
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* Show root error if any */}
        {form.formState.errors.root && (
          <div className="text-destructive text-sm">
            {form.formState.errors.root.message}
          </div>
        )}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter your title" {...field} />
              </FormControl>
              <FormDescription>This is your album title.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your album&rsquo;s description.
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
                <FormLabel>Album Cover</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </FormControl>
                <FormDescription>
                  This is your album&rsquo;s cover image (Optional).
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
              <FormLabel>Album Order</FormLabel>
              <FormControl>
                <Input type="number" min="1" {...field} />
              </FormControl>
              <FormDescription>
                This is the album&rsquo;s order on the page.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 justify-around">
          <Button
            disabled={form.formState.isSubmitting || !isDirty || invalidImage}
            type="submit"
            className="cursor-pointer"
          >
            {album ? "Confirm" : "Create"}
            {form.formState.isSubmitting && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            type="button"
            asChild
            variant="outline"
          >
            <Link href={returnUrl}>Cancel</Link>
          </Button>

          {/* Delete Button (only shows if editing existing event) */}
          {album && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  disabled={isDeletePending || form.formState.isSubmitting}
                  className="cursor-pointer"
                >
                  Delete Album
                  {isDeletePending && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this album.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive hover:bg-red-500 text-white cursor-pointer"
                    disabled={isDeletePending || form.formState.isSubmitting}
                    onClick={() => {
                      // Start a React transition to keep the UI responsive during this async operation
                      startDeleteTransition(async () => {
                        try {
                          // Attempt to delete the event by its ID
                          await deleteAlbum(album.id);
                          router.push("/dashboard");
                          toast.success("Album has been deleted");
                        } catch (error: unknown) {
                          // If something goes wrong, show an error at the root level of the form
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
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </form>
    </Form>
  );
}
