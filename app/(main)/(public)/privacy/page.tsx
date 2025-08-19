/**
 * Privacy Policy Page: Displays the application's privacy policy and terms.
 *
 * This page provides:
 * - Comprehensive privacy policy information
 * - Legal compliance documentation
 * - User-friendly policy presentation
 * - Animated background elements
 * - Responsive design for all devices
 *
 * Features:
 * - Glassmorphism styling with backdrop blur
 * - Animated background elements
 * - Card-based content organization
 * - Navigation back to home
 * - Footer integration
 *
 * @returns Privacy policy page with comprehensive legal information
 */
// app/privacy/page.tsx

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Lock, Eye, Users, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

/**
 * Privacy policy page component that displays comprehensive legal information.
 *
 * Layout:
 * - Animated background with glassmorphism effects
 * - Navigation header with back button
 * - Card-based content sections
 * - Footer with additional links
 *
 * @returns Privacy policy page with legal information and navigation
 */
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements - Creates depth and visual interest */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />

      {/* Navigation Header - Back button and page title */}
      <nav className="relative z-10 flex justify-between items-center px-4 sm:px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <Button
          variant="ghost"
          asChild
          className="text-white hover:text-white/80 hover:bg-white/10"
        >
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-400" />
          <span className="text-lg font-semibold text-white">
            Privacy Policy
          </span>
        </div>
      </nav>

      {/* Main Content Area - Privacy policy sections */}
      <main className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
          {/* Page Header - Title and description */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 text-white/90 text-sm backdrop-blur-xl">
              <Shield className="w-4 h-4" />
              <span>Privacy & Security</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Privacy Policy
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Welcome to our application. Your privacy is important to us. Learn
              how we protect your data and ensure your photos remain secure.
            </p>
          </div>

          {/* Last Updated Information */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-medium">Last Updated</p>
                  <p className="text-white/60 text-sm">July 8, 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Principles - Key concepts in card format */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Data Security Principle */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white group hover:bg-white/15 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <Lock className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle className="text-white">Data Security</CardTitle>
                <CardDescription className="text-white/60">
                  We implement reasonable security measures to protect your
                  personal information stored in our database.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Public Sharing Principle */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white group hover:bg-white/15 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                  <Eye className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle className="text-white">Public Sharing</CardTitle>
                <CardDescription className="text-white/60">
                  Our platform is designed to help you share content with
                  others. Any content you voluntarily upload is considered
                  public.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Account Control Principle */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white group hover:bg-white/15 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
                <CardTitle className="text-white">Account Control</CardTitle>
                <CardDescription className="text-white/60">
                  You have the right to access, update, or delete the
                  information we have on you at any time.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Detailed Policy Sections */}
          <div className="space-y-8">
            {/* Introduction Section */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <span className="text-blue-400 font-bold">1</span>
                  </div>
                  Introduction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80 leading-relaxed">
                  Welcome to our application. Your privacy is important to us.
                  This Privacy Policy explains how we collect, use, and share
                  your information when you use our service. By using our
                  website, you agree to the collection and use of information in
                  accordance with this policy.
                </p>
              </CardContent>
            </Card>

            {/* Information Collection Section */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <span className="text-purple-400 font-bold">2</span>
                  </div>
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80 leading-relaxed">
                  When you sign up and authenticate using our third-party
                  provider, <strong>Clerk</strong>, we require access to certain
                  personal information to create and manage your account. The
                  data we store in our database includes:
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-3">
                    <span>
                      <strong>Display Name:</strong> Your publicly visible name
                      on our platform.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span>
                      <strong>Username:</strong> Your unique identifier for your
                      profile.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span>
                      <strong>Bio:</strong> The personal description you provide
                      for your profile.
                    </span>
                  </li>
                </ul>
                <p className="text-white/80 leading-relaxed">
                  We rely on Clerk for the secure handling of your
                  authentication credentials (like email or social logins), and
                  we do not store your passwords.
                </p>
              </CardContent>
            </Card>

            {/* Public Information Section */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 font-bold">3</span>
                  </div>
                  Publicly Shared Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80 leading-relaxed">
                  Our platform is designed to help you share content with
                  others. Any content you voluntarily upload is considered
                  public information and can be viewed by anyone. This includes:
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-3">
                    <span>
                      <strong>Images and Albums:</strong> Any images or
                      collections of images you upload.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span>
                      <strong>Names and Descriptions:</strong> The titles and
                      descriptions you assign to your images or albums.
                    </span>
                  </li>
                </ul>
                <p className="text-white/80 leading-relaxed">
                  Please be mindful of the information you share, as we cannot
                  control how others may use this publicly available data.
                </p>
              </CardContent>
            </Card>

            {/* Information Usage Section */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <span className="text-orange-400 font-bold">4</span>
                  </div>
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80 leading-relaxed">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-3">
                    <span>
                      <strong>Account Management:</strong> To create and
                      maintain your user account and profile.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span>
                      <strong>Content Display:</strong> To display your photos
                      and albums as you&apos;ve configured them.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span>
                      <strong>Service Improvement:</strong> To improve our
                      platform and user experience.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span>
                      <strong>Communication:</strong> To respond to your
                      inquiries and provide support.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer - Additional navigation and links */}
      <Footer isPrivacyPage={true} />
    </div>
  );
}
