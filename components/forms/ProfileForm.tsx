"use client";

import { createProfile, updateProfile } from "@/server/actions/profiles";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileFormSchema } from "@/server/schema/profiles";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";

export default function ProfileForm({
  profile, // Destructure the `event` object from the props
}: {
  // Define the shape (TypeScript type) of the expected props
  profile?: {
    // Optional `event` object (might be undefined if creating a new event)
    displayName: string; // Unique identifier for the event
    username: string; // Name of the event
    bio: string; // Optional description of the event
  };
}) {
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof ProfileFormSchema>) {
    const action = profile == null ? createProfile : updateProfile;
    try {
      await action(data);
      router.push("/dashboard");
      toast.success(`Profile ${profile ? "edited" : "created"} successfully`);
    } catch (error: unknown) {
      form.setError("root", {
        message: `There was an error saving your profile ${
          error instanceof Error ? error.message : String(error)
        }`,
      });
    }
  }

  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: profile
      ? {
          // If `event` is provided (edit mode), spread its existing properties as default values
          ...profile,
        }
      : {
          // If `event` is not provided (create mode), use these fallback defaults
          displayName: "", // New events are active by default
          username: "", // Default duration is 30 minutes
          bio: "", // Ensure controlled input: default to empty string
        },
  });

  const { isDirty } = form.formState;

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
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your display name"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is how others will see your name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your public username.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biography</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your bio"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your profile description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 justify-around">
          <Button
            disabled={form.formState.isSubmitting || !isDirty}
            type="submit"
            className="cursor-pointer"
          >
            {profile ? "Confirm" : "Create"}
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            type="button"
            asChild
            variant="outline"
          >
            <Link href="/dashboard">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
