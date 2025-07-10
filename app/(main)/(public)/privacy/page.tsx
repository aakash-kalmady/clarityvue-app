// app/privacy/page.tsx

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  Lock,
  Eye,
  Users,
  FileText,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />

      {/* Navigation */}
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

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
          {/* Header */}
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

          {/* Last Updated */}
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

          {/* Privacy Principles */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

          {/* Detailed Sections */}
          <div className="space-y-8">
            {/* Introduction */}
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

            {/* Information We Collect */}
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
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Display Name:</strong> Your publicly visible name
                      on our platform.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Username:</strong> Your unique identifier for your
                      profile.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
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

            {/* Publicly Shared Information */}
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
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Images and Albums:</strong> Any images or
                      collections of images you upload.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
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

            {/* How We Use Information */}
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
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>To provide and maintain our service.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>To manage your account and profile.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      To display your user-generated content to the public as
                      intended by the service.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>To improve our website and user experience.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Your Rights and Data Management */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <span className="text-blue-400 font-bold">5</span>
                  </div>
                  Your Rights and Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80 leading-relaxed">
                  You have the right to access, update, or delete the
                  information we have on you. You can manage your display name,
                  username, and bio directly from your account settings page.
                </p>
              </CardContent>
            </Card>

            {/* Account Deletion and Data Retention */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <span className="text-purple-400 font-bold">6</span>
                  </div>
                  Account Deletion and Data Retention
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80 leading-relaxed">
                  We give you full control over your account. If you choose to
                  delete your account from our authentication provider,{" "}
                  <strong>Clerk</strong>, this action will trigger a complete
                  removal of your data from our systems.
                </p>
                <p className="text-white/80 leading-relaxed">
                  Upon account deletion, we will permanently:
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Delete your personal data</strong> (display name,
                      username, bio) from our application databases.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Delete all images and albums</strong> you have
                      uploaded from our storage provider, Amazon Web Services
                      (AWS) S3.
                    </span>
                  </li>
                </ul>
                <p className="text-white/80 leading-relaxed">
                  This process is irreversible. Once your data is deleted, it
                  cannot be recovered.
                </p>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 font-bold">7</span>
                  </div>
                  Data Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80 leading-relaxed">
                  We are committed to protecting your data. We implement
                  reasonable security measures to protect your personal
                  information stored in our database. However, please remember
                  that no method of transmission over the Internet or method of
                  electronic storage is 100% secure.
                </p>
              </CardContent>
            </Card>

            {/* Changes to This Privacy Policy */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <span className="text-orange-400 font-bold">8</span>
                  </div>
                  Changes to This Privacy Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80 leading-relaxed">
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the &ldquo;Last Updated&rdquo; date.
                  You are advised to review this Privacy Policy periodically for
                  any changes.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <span className="text-blue-400 font-bold">9</span>
                  </div>
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80 leading-relaxed">
                  If you have any questions about this Privacy Policy, please
                  contact us at:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="font-medium text-white">Email</p>
                    <a
                      href="mailto:arkalmady@gmail.com"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      arkalmady@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border-white/20 text-white text-center">
            <CardContent className="p-8">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-white/70 mb-6 max-w-md mx-auto">
                Join thousands of photographers who trust ClarityVue with their
                precious memories.
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Link href="/">Create Your Portfolio</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-6 px-4 sm:px-6 bg-white/5 backdrop-blur-xl mt-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/60 text-sm">
          <p>&copy; 2025 Aakash Kalmady.</p>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              asChild
              size="sm"
              className="text-white/60 hover:text-white"
            >
              <Link href="/">Home</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
