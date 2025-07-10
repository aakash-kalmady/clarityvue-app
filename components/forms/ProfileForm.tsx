"use client";

import { createProfile, updateProfile } from "@/server/actions/profiles";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileFormSchema } from "@/server/schema/profiles";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, User, AtSign, FileText } from "lucide-react";
import { z } from "zod";
import Link from "next/link";

export default function ProfileForm({
  profile,
}: {
  profile?: {
    displayName: string;
    username: string;
    bio: string;
  };
}) {
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof ProfileFormSchema>) {
    const action = profile == null ? createProfile : updateProfile;
    try {
      await action(data);
      router.push("/dashboard");
      toast.success(`Profile ${profile ? "updated" : "created"} successfully`);
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
          ...profile,
        }
      : {
          displayName: "",
          username: "",
          bio: "",
        },
  });

  const { isDirty } = form.formState;

  return (
    <div className="w-lg mx-auto p-6">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-black/20 p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">
            {profile ? "Edit Profile" : "Create Your Profile"}
          </h1>
          <p className="text-white/70 text-base mt-2">
            {profile
              ? "Update your public profile information."
              : "Set up your profile to get started with ClarityVue."}
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Show root error if any */}
            {form.formState.errors.root && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {form.formState.errors.root.message}
              </div>
            )}
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white flex items-center gap-2 text-base font-semibold">
                    <User className="w-4 h-4" />
                    Display Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your full name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.3)] text-base transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-white/60 text-sm">
                    This name will be visible on your public profile.
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
                  <FormLabel className="text-white flex items-center gap-2 text-base font-semibold">
                    <AtSign className="w-4 h-4" />
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Unique username (e.g. janedoe)"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 focus:shadow-[0_0_0_2px_rgba(168,85,247,0.3)] text-base transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-white/60 text-sm">
                    Your username will be part of your public profile URL.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white flex items-center gap-2 text-base font-semibold">
                    <FileText className="w-4 h-4" />
                    Biography
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell visitors about yourself and your photography style."
                      className="resize-none bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.3)] text-base transition-all duration-200"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-white/60 text-sm">
                    Share a short bio for your profile page.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                disabled={form.formState.isSubmitting || !isDirty}
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg text-base font-semibold py-3 transition-all duration-200 flex items-center justify-center min-w-0"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2 flex-shrink-0" />
                    <span className="truncate">
                      {profile ? "Updating..." : "Creating..."}
                    </span>
                  </>
                ) : (
                  <>
                    <User className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span className="truncate">
                      {profile ? "Update" : "Create"}
                    </span>
                  </>
                )}
              </Button>
              {profile && (
                <Button
                  disabled={form.formState.isSubmitting}
                  type="button"
                  asChild
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10 text-base font-semibold min-w-0"
                >
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center"
                  >
                    <span className="truncate">Cancel</span>
                  </Link>
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
