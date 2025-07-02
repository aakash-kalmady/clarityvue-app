"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAlbum, deleteAlbum, updateAlbum } from "@/server/actions/albums";
import { AlbumFormSchema } from "@/server/schema/albums";
import { useTransition } from "react";
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
  };
}) {
  const router = useRouter();
  const [isDeletePending, startDeleteTransition] = useTransition();

  const onSubmit = async (data: z.infer<typeof AlbumFormSchema>) => {
    const action =
      album == null ? createAlbum : updateAlbum.bind(null, album.id);
    try {
      await action(data);
      toast(`Album has been ${album ? "edited" : "created"}.`);
      router.push(`${album ? `/album/${album.id}` : "/dashboard"}`);
    } catch (error: any) {
      form.setError("root", {
        message: `There was an error saving your album ${error.message}`,
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
        },
  });

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
                <Input type="text" placeholder="Title" {...field} />
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
                <Input type="text" placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>
                This is your album's description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="albumOrder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Album Order</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormDescription>
                This is the album's order on the page.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 justify-around">
          <Button
            disabled={form.formState.isSubmitting}
            type="button"
            asChild
            variant="outline"
          >
            <Link href={album ? `/album/${album.id}` : "/dashboard"}>
              Cancel
            </Link>
          </Button>
          <Button disabled={form.formState.isSubmitting} type="submit">
            {album ? "Confirm" : "Create"}
          </Button>

          {/* Delete Button (only shows if editing existing event) */}
          {album && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="cursor-pointer hover:scale-105 hover:bg-red-700"
                  variant="destructive"
                  disabled={isDeletePending || form.formState.isSubmitting}
                >
                  Delete Album
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
                    className="bg-red-500 hover:bg-red-700 cursor-pointer"
                    disabled={isDeletePending || form.formState.isSubmitting}
                    onClick={() => {
                      // Start a React transition to keep the UI responsive during this async operation
                      startDeleteTransition(async () => {
                        try {
                          // Attempt to delete the event by its ID
                          await deleteAlbum(album.id);
                          toast("Album has been deleted");
                          router.push("/dashboard");
                        } catch (error: any) {
                          // If something goes wrong, show an error at the root level of the form
                          form.setError("root", {
                            message: `There was an error deleting your album: ${error.message}`,
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
