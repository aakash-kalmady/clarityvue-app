import { Button } from "./ui/button";
import Link from "next/link";
import {
  Camera,
  Sparkles,
  Users,
  Shield,
  Zap,
  CheckCircle,
  UserPlus,
  UserCircle,
  FolderPlus,
  ImagePlus,
  Share2,
} from "lucide-react";
import PublicNavBar from "./PublicNavBar";

export default function LandingPage() {
  const steps = [
    {
      icon: <UserPlus className="w-6 h-6 text-blue-400 shrink-0" />,
      text: (
        <>
          <b>Create an account:</b> Click{" "}
          <span className="text-blue-400">Get Started</span> and sign up with
          your email or Google.
        </>
      ),
    },
    {
      icon: <UserCircle className="w-6 h-6 text-purple-400 shrink-0" />,
      text: (
        <>
          <b>Set up your profile:</b> Add your display name, username, and a
          profile picture.
        </>
      ),
    },
    {
      icon: <FolderPlus className="w-6 h-6 text-pink-400 shrink-0" />,
      text: (
        <>
          <b>Create albums:</b> Organize your photos into beautiful albums with
          titles and descriptions.
        </>
      ),
    },
    {
      icon: <ImagePlus className="w-6 h-6 text-cyan-400 shrink-0" />,
      text: (
        <>
          <b>Upload photos:</b> Drag and drop or select images to upload to your
          albums.
        </>
      ),
    },
    {
      icon: <Share2 className="w-6 h-6 text-green-400 shrink-0" />,
      text: (
        <>
          <b>Share your work:</b> Share your public profile or album links with
          friends, clients, or the world!
        </>
      ),
    },
  ];

  const features = [
    { icon: Camera, text: "High-Quality Uploads", color: "blue" },
    { icon: Shield, text: "Secure & Private", color: "purple" },
    { icon: Users, text: "Easy Sharing", color: "pink" },
    { icon: Zap, text: "Lightning Fast", color: "cyan" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex flex-col">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />

      {/* Floating orbs */}
      <div
        className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
        style={{
          animationDuration: "4s",
        }}
      />
      <div
        className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"
        style={{
          animationDuration: "4s",
        }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl animate-bounce"
        style={{
          animationDuration: "3s",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl animate-pulse"
        style={{
          animationDuration: "3s",
        }}
      />

      {/* Static Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => {
          const left = `${(i * 7) % 100}%`;
          const top = `${(i * 11) % 100}%`;
          const delay = `${(i * 0.3) % 4}s`;
          const duration = `${4 + (i % 3)}s`;

          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left,
                top,
                animationDelay: delay,
                animationDuration: duration,
              }}
            />
          );
        })}
      </div>

      {/* Navigation */}
      <PublicNavBar />

      {/* Hero Section with enhanced animations */}
      <main className="relative z-10 py-8 sm:py-12 flex-1 flex items-center">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[60vh] lg:min-h-[70vh]">
            {/* Left Column - Content with staggered animations */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Badge with enhanced animation */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 text-white/90 text-sm backdrop-blur-xl opacity-0 animate-[fadeIn_1s_ease-out_0.2s_forwards]">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span className="hidden sm:inline">
                  Professional Photo Portfolio Platform
                </span>
                <span className="sm:hidden">Photo Portfolio Platform</span>
              </div>

              {/* Main heading with enhanced animation */}
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
                  Your Photos,
                  <span
                    className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient"
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                  >
                    Perfectly Organized
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0 opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
                  Craft stunning professional photo portfolios with our modern,
                  high-performance platform. Showcase your work beautifully with
                  advanced organization and sharing features.
                </p>
              </div>

              {/* Enhanced Features Grid with staggered animations */}
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left mt-8">
                {features.map((feature, index) => {
                  const colorClasses = {
                    blue: "bg-blue-600/20 text-blue-300 hover:bg-blue-600/30",
                    purple:
                      "bg-purple-600/20 text-purple-300 hover:bg-purple-600/30",
                    pink: "bg-pink-600/20 text-pink-300 hover:bg-pink-600/30",
                    cyan: "bg-cyan-600/20 text-cyan-300 hover:bg-cyan-600/30",
                  };

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-white/80 group hover:text-white p-3 rounded-xl transition-all duration-300 hover:bg-white/5 opacity-0"
                      style={{
                        animation: `fadeIn 0.8s ease-out ${
                          0.8 + index * 0.1
                        }s forwards`,
                      }}
                    >
                      <div
                        className={`p-2 rounded-lg transition-all duration-300 group-hover:scale-110 ${
                          colorClasses[
                            feature.color as keyof typeof colorClasses
                          ]
                        }`}
                      >
                        <feature.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">
                        {feature.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Platform Features with enhanced animation */}
              <div className="flex items-center justify-center lg:justify-start gap-6 text-white/60 text-xs sm:text-sm opacity-0 animate-[fadeIn_1s_ease-out_1.2s_forwards]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Free to use</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Built with modern tech</span>
                </div>
              </div>
            </div>

            {/* Right Column - Getting Started with enhanced animations */}
            <div className="flex items-center justify-center mt-8 lg:mt-0 w-full min-h-[400px] opacity-0 animate-[fadeIn_1s_ease-out_0.3s_forwards]">
              <div className="w-full max-w-md p-4 lg:pl-6 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col items-center relative overflow-hidden">
                {/* Header with enhanced animation */}
                <div className="text-center mb-4 w-full opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 drop-shadow-lg">
                    Getting Started
                  </h2>
                </div>

                {/* Steps with staggered animations */}
                <ul className="space-y-2 w-full relative z-20">
                  {steps.map((step, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-all duration-300 w-full opacity-0"
                      style={{
                        animation: `fadeIn 0.8s ease-out ${
                          0.6 + i * 0.2
                        }s forwards`,
                      }}
                    >
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="rounded-full bg-white/15 p-1.5 mb-1 shadow-md hover:scale-110 transition-all duration-300">
                          {step.icon}
                        </div>
                        {i < steps.length - 1 && (
                          <div className="hidden lg:block w-1 h-4 bg-gradient-to-b from-blue-400/30 via-purple-400/20 to-pink-400/10" />
                        )}
                      </div>
                      <span className="text-white/90 text-sm leading-snug flex-1">
                        {step.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Enhanced CTA button */}
                <div className="mt-6 flex justify-center w-full opacity-0 animate-[fadeIn_1s_ease-out_1.6s_forwards]">
                  <Link href="/login">
                    <Button className="w-full px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-base shadow-lg transition-all duration-300 hover:scale-105">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="relative z-10 border-t border-white/10 py-2 sm:py-3 px-4 sm:px-6 bg-white/5 backdrop-blur-xl mt-auto opacity-0 animate-[fadeIn_1s_ease-out_1.8s_forwards]">
        <div className="flex flex-row items-center justify-between gap-x-4 text-white/60 text-xs w-full">
          <p className="text-left">&copy; 2025 Aakash Kalmady.</p>
          <div className="flex items-center gap-4">
            <Button
              variant="link"
              asChild
              size="sm"
              className="text-white/60 hover:text-white text-xs h-6 px-2 transition-all duration-300 hover:scale-105"
            >
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
