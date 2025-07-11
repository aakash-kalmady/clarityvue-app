/**
 * Root Page: The main entry point of the application.
 *
 * This page handles authentication-based routing:
 * - Unauthenticated users: Redirected to LandingPage component
 * - Authenticated users: Redirected to dashboard
 *
 * Features:
 * - Server-side authentication checking
 * - Automatic redirects based on auth state
 * - Seamless user experience for both states
 *
 * @returns LandingPage for unauthenticated users or redirects to dashboard
 */
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LandingPage from "../components/LandingPage";

/**
 * Main page component that handles authentication-based routing.
 *
 * Logic:
 * 1. Check if user is authenticated using Clerk
 * 2. If not authenticated: Show landing page with features and sign-up
 * 3. If authenticated: Redirect to dashboard for authenticated experience
 *
 * @returns LandingPage component or redirects to dashboard
 */
export default async function Home() {
  // Check authentication status using Clerk
  const { userId } = await auth();

  // Return landing page for unauthenticated users, redirect authenticated users to dashboard
  return !userId ? <LandingPage /> : redirect("/dashboard");
}
