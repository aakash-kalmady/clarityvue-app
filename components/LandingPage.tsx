"use client";

import { Button } from "./ui/button";
import Image from "next/image";
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
import { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
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

  useEffect(() => {
    // Trigger initial animations
    const timer = setTimeout(() => setIsVisible(true), 100);

    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Standardized animation classes
  const fadeInUp = (delay: number) =>
    `transition-all duration-700 delay-${delay} ${
      isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
    }`;

  const fadeInScale = (delay: number) =>
    `transition-all duration-700 delay-${delay} ${
      isVisible
        ? "translate-y-0 opacity-100 scale-100"
        : "translate-y-8 opacity-0 scale-95"
    }`;

  const fadeInLeft = (delay: number) =>
    `transition-all duration-700 delay-${delay} ${
      isVisible
        ? "translate-x-0 opacity-100 scale-100"
        : "translate-x-8 opacity-0 scale-95"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex flex-col">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
      <div className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl animate-bounce" />
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav
        className={`relative z-10 flex justify-between items-center px-4 sm:px-6 py-3 border-b border-white/10 bg-white/5 backdrop-blur-xl ${fadeInUp(
          0
        )}`}
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <Image
              src="/assets/logo.svg"
              width={28}
              height={28}
              className="sm:w-8 sm:h-8 animate-pulse"
              alt="Logo"
            />
          </div>
          <span className="text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            ClarityVue
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="link"
                asChild
                className="text-white/80 hover:text-white text-sm sm:text-base transition-all duration-300 hover:scale-105"
              >
                <Link href="/privacy">Privacy</Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View our privacy policy</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 py-8 sm:py-12 flex-1 flex items-center">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[60vh] lg:min-h-[70vh]">
            {/* Left Column - Content */}
            <div ref={heroRef} className="space-y-6 text-center lg:text-left">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 text-white/90 text-sm backdrop-blur-xl ${fadeInScale(
                  100
                )}`}
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span className="hidden sm:inline">
                  Professional Photo Portfolio Platform
                </span>
                <span className="sm:hidden">Photo Portfolio Platform</span>
              </div>

              <h1
                className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight ${fadeInUp(
                  200
                )}`}
              >
                Your Photos,
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                  Perfectly Organized
                </span>
              </h1>

              <p
                className={`text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0 ${fadeInUp(
                  300
                )}`}
              >
                Craft stunning professional photo portfolios with our modern,
                high-performance platform. Showcase your work beautifully with
                advanced organization and sharing features.
              </p>

              {/* Features Grid */}
              <div
                ref={featuresRef}
                className="grid grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0 text-center lg:text-left mt-6"
              >
                {[
                  { icon: Camera, text: "High-Quality Uploads" },
                  { icon: Shield, text: "Secure & Private" },
                  { icon: Users, text: "Easy Sharing" },
                  { icon: Zap, text: "Lightning Fast" },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 text-white/80 group hover:text-white ${fadeInUp(
                      400 + index * 50
                    )}`}
                  >
                    <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                      <feature.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Platform Features */}
              <div
                className={`flex items-center justify-center lg:justify-start gap-4 text-white/60 text-xs sm:text-sm ${fadeInUp(
                  600
                )}`}
              >
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-400 animate-pulse" />
                  <span>Free to use</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-400 animate-pulse" />
                  <span>Built with modern tech</span>
                </div>
              </div>
            </div>
            {/* Right Column - Getting Started (on mobile, stacks below) */}
            <div
              className={`flex items-center justify-center mt-8 lg:mt-0 ${fadeInLeft(
                400
              )}`}
            >
              <div className="w-full max-w-md p-5 lg:pl-6 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col items-center animate-fade-in relative overflow-hidden">
                {/* Accent bar only on large screens, only on the left */}
                <div className="hidden lg:block absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500/40 via-purple-500/30 to-pink-500/20 rounded-full pointer-events-none z-10" />
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 text-center drop-shadow-lg">
                  Getting Started
                </h2>
                <p className="text-white/70 mb-4 text-center text-sm sm:text-base">
                  How to use ClarityVue in 5 easy steps
                </p>
                <ul className="space-y-3 w-full relative z-20">
                  {steps.map((step, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-3 ${fadeInUp(
                        500 + i * 75
                      )}`}
                    >
                      <div className="flex flex-col items-center">
                        <div className="rounded-full bg-white/15 p-2 mb-1 shadow-md">
                          {step.icon}
                        </div>
                        {i < steps.length - 1 && (
                          <div className="hidden lg:block w-1 h-5 bg-gradient-to-b from-blue-400/30 via-purple-400/20 to-pink-400/10" />
                        )}
                      </div>
                      <span className="text-white/90 text-base leading-snug">
                        {step.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex justify-center w-full">
                  <Link href="/login">
                    <Button className="w-full px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-base shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`relative z-10 border-t border-white/10 py-2 sm:py-3 px-4 sm:px-6 bg-white/5 backdrop-blur-xl mt-auto ${fadeInUp(
          700
        )}`}
      >
        <div className="flex flex-row items-center justify-between gap-x-4 text-white/60 text-xs w-full">
          <p className="text-left">&copy; 2025 Aakash Kalmady.</p>
          <div className="flex items-center gap-2 sm:gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="link"
                  asChild
                  size="sm"
                  className="text-white/60 hover:text-white text-xs h-6 px-2 transition-all duration-300 hover:scale-105"
                >
                  <Link href="/privacy">Privacy Policy</Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Read our privacy policy</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </footer>
    </div>
  );
}
