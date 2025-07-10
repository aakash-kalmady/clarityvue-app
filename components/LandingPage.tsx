"use client";

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
  Star,
} from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";
import PublicNavBar from "./PublicNavBar";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    setMounted(true);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced animation styles with inline CSS
  const createAnimation = (delay: number, duration: number = 700) => ({
    style: {
      transition: `all ${duration}ms ease-out`,
      transitionDelay: `${delay}ms`,
      transform: mounted
        ? "translateY(0) scale(1)"
        : "translateY(32px) scale(0.95)",
      opacity: mounted ? 1 : 0,
    },
  });

  const createStaggeredAnimation =
    (baseDelay: number, stagger: number = 100) =>
    (index: number) =>
      createAnimation(baseDelay + index * stagger);

  const createFadeInRight = (delay: number) => ({
    style: {
      transition: "all 800ms ease-out",
      transitionDelay: `${delay}ms`,
      transform: mounted
        ? "translateX(0) scale(1)"
        : "translateX(-48px) scale(0.95)",
      opacity: mounted ? 1 : 0,
    },
  });

  const createScaleIn = (delay: number) => ({
    style: {
      transition: "all 1000ms ease-out",
      transitionDelay: `${delay}ms`,
      transform: mounted ? "scale(1)" : "scale(0.75)",
      opacity: mounted ? 1 : 0,
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex flex-col">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />

      {/* Floating orbs with parallax */}
      <div
        className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          animationDuration: "4s",
        }}
      />
      <div
        className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"
        style={{
          transform: `translateY(${-scrollY * 0.05}px)`,
          animationDuration: "4s",
        }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl animate-bounce"
        style={{
          transform: `translateX(${scrollY * 0.02}px)`,
          animationDuration: "3s",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl animate-pulse"
        style={{
          transform: `translateX(${-scrollY * 0.03}px)`,
          animationDuration: "3s",
        }}
      />

      {/* Optimized Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {useMemo(() => {
          const particles: Array<{
            left: string;
            top: string;
            animationDelay: string;
            animationDuration: string;
          }> = [];
          for (let i = 0; i < 15; i++) {
            // Use a stable seed based on index to ensure consistent values
            const seed = i * 12345;
            const left = (((seed * 9301 + 49297) % 233280) / 233280) * 100;
            const top = (((seed * 49297 + 9301) % 233280) / 233280) * 100;
            const delay = (((seed * 49297 + 49297) % 233280) / 233280) * 4;
            const duration = 4 + (((seed * 9301 + 9301) % 233280) / 233280) * 3;

            particles.push({
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            });
          }
          return particles;
        }, []).map(
          (
            particle: {
              left: string;
              top: string;
              animationDelay: string;
              animationDuration: string;
            },
            i: number
          ) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.animationDelay,
                animationDuration: particle.animationDuration,
                transform: `translateY(${scrollY * 0.02}px)`,
                willChange: "transform",
              }}
            />
          )
        )}
      </div>

      {/* Navigation */}
      <PublicNavBar />

      {/* Hero Section with enhanced animations */}
      <main className="relative z-10 py-8 sm:py-12 flex-1 flex items-center">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[60vh] lg:min-h-[70vh]">
            {/* Left Column - Content with staggered animations */}
            <div ref={heroRef} className="space-y-8 text-center lg:text-left">
              {/* Badge with enhanced animation */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 text-white/90 text-sm backdrop-blur-xl"
                style={createScaleIn(100).style}
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span className="hidden sm:inline">
                  Professional Photo Portfolio Platform
                </span>
                <span className="sm:hidden">Photo Portfolio Platform</span>
              </div>

              {/* Main heading with enhanced animation */}
              <div className="space-y-4">
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
                  style={createAnimation(200).style}
                >
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

                <p
                  className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                  style={createAnimation(400).style}
                >
                  Craft stunning professional photo portfolios with our modern,
                  high-performance platform. Showcase your work beautifully with
                  advanced organization and sharing features.
                </p>
              </div>

              {/* Enhanced Features Grid with staggered animations */}
              <div
                ref={featuresRef}
                className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left mt-8"
              >
                {features.map((feature, index) => {
                  const animation = createStaggeredAnimation(600, 150)(index);
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
                      className="flex items-center gap-3 text-white/80 group hover:text-white p-3 rounded-xl transition-all duration-300 hover:bg-white/5"
                      style={animation.style}
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
              <div
                className="flex items-center justify-center lg:justify-start gap-6 text-white/60 text-xs sm:text-sm"
                style={createAnimation(1200).style}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Free to use</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Built with modern tech</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>Open source</span>
                </div>
              </div>
            </div>

            {/* Right Column - Getting Started with enhanced animations */}
            <div
              className="flex items-center justify-center mt-8 lg:mt-0"
              style={createFadeInRight(300).style}
            >
              <div className="w-full max-w-md p-4 lg:pl-6 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col items-center relative overflow-hidden">
                {/* Enhanced accent bar */}
                <div className="hidden lg:block absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500/40 via-purple-500/30 to-pink-500/20 rounded-full pointer-events-none z-10" />

                {/* Header with enhanced animation */}
                <div
                  className="text-center mb-4"
                  style={createAnimation(400).style}
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 drop-shadow-lg">
                    Getting Started
                  </h2>
                </div>

                {/* Steps with staggered animations */}
                <ul className="space-y-2 w-full relative z-20">
                  {steps.map((step, i) => {
                    const animation = createStaggeredAnimation(600, 200)(i);

                    return (
                      <li
                        key={i}
                        className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-all duration-300"
                        style={animation.style}
                      >
                        <div className="flex flex-col items-center">
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
                    );
                  })}
                </ul>

                {/* Enhanced CTA button */}
                <div
                  className="mt-6 flex justify-center w-full"
                  style={createAnimation(1600).style}
                >
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
      <footer
        className="relative z-10 border-t border-white/10 py-2 sm:py-3 px-4 sm:px-6 bg-white/5 backdrop-blur-xl mt-auto"
        style={createAnimation(1800).style}
      >
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
