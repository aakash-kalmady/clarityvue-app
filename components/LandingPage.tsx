"use client";

import { SignIn } from "@clerk/nextjs";
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
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const signInRef = useRef<HTMLDivElement>(null);

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
        className={`relative z-10 flex justify-between items-center px-4 sm:px-6 py-3 border-b border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-1000 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-[-20px] opacity-0"
        }`}
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
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center min-h-[60vh] lg:min-h-[70vh]">
            {/* Left Column - Content */}
            <div
              ref={heroRef}
              className="space-y-4 sm:space-y-6 text-center lg:text-left"
            >
              <div className="space-y-3 sm:space-y-4">
                <div
                  className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 text-white/90 text-xs sm:text-sm backdrop-blur-xl transition-all duration-1000 delay-300 ${
                    isVisible
                      ? "translate-y-0 opacity-100 scale-100"
                      : "translate-y-10 opacity-0 scale-95"
                  }`}
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                  <span className="hidden sm:inline">
                    Professional Photo Portfolio Platform
                  </span>
                  <span className="sm:hidden">Photo Portfolio Platform</span>
                </div>

                <h1
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight transition-all duration-1000 delay-500 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  Your Photos,
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                    Perfectly Organized
                  </span>
                </h1>

                <p
                  className={`text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0 transition-all duration-1000 delay-700 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  Craft stunning professional photo portfolios with our modern,
                  high-performance platform. Showcase your work beautifully with
                  advanced organization and sharing features.
                </p>
              </div>

              {/* Features Grid */}
              <div
                ref={featuresRef}
                className="grid grid-cols-2 gap-2 sm:gap-3 max-w-lg mx-auto lg:mx-0 text-center lg:text-left"
              >
                {[
                  { icon: Camera, text: "High-Quality Uploads" },
                  { icon: Shield, text: "Secure & Private" },
                  { icon: Users, text: "Easy Sharing" },
                  { icon: Zap, text: "Lightning Fast" },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 sm:gap-3 text-white/80 group hover:text-white transition-all duration-500 delay-${
                      800 + index * 100
                    } ${
                      isVisible
                        ? "translate-y-0 opacity-100 scale-100"
                        : "translate-y-10 opacity-0 scale-95"
                    }`}
                  >
                    <div className="p-1.5 sm:p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                      <feature.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-xs sm:text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Platform Features */}
              <div
                className={`flex items-center justify-center lg:justify-start gap-4 text-white/60 text-xs sm:text-sm transition-all duration-1000 delay-1200 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 animate-pulse" />
                  <span>Free to use</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 animate-pulse" />
                  <span>Built with modern tech</span>
                </div>
              </div>
            </div>

            {/* Right Column - Sign In */}
            <div
              ref={signInRef}
              className={`flex justify-center lg:justify-end transition-all duration-1000 delay-1000 ${
                isVisible
                  ? "translate-x-0 opacity-100 scale-100"
                  : "translate-x-10 opacity-0 scale-95"
              }`}
            >
              <div className="w-full max-w-sm sm:max-w-md">
                <SignIn
                  routing="hash"
                  appearance={{
                    elements: {
                      formButtonPrimary:
                        "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105",
                      card: "bg-transparent shadow-none",
                      headerTitle:
                        "text-white text-lg sm:text-xl font-semibold",
                      headerSubtitle: "text-white/60 text-sm",
                      formFieldInput:
                        "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-2 focus:ring-blue-500/50 text-sm sm:text-base transition-all duration-200",
                      formFieldLabel: "text-white/80 text-sm font-medium",
                      footerActionLink:
                        "text-blue-400 hover:text-blue-300 text-sm transition-colors",
                      dividerLine: "bg-white/20",
                      dividerText: "text-white/60 text-sm",
                      socialButtonsBlockButton:
                        "bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-200 text-sm hover:scale-105",
                      socialButtonsBlockButtonText: "text-white text-sm",
                      formResendCodeLink:
                        "text-blue-400 hover:text-blue-300 text-sm transition-colors",
                      formFieldInputShowPasswordButton:
                        "text-white/60 hover:text-white transition-colors",
                      formFieldInputShowPasswordIcon: "text-white/60",
                      footer:
                        "bg-transparent border-none shadow-none text-white/70",
                      footerContent: "text-white/70",
                      footerAction: "text-white/80",
                      badge:
                        "bg-transparent text-white/60 border-none shadow-none",
                      logoBox:
                        "bg-transparent text-white/60 border-none shadow-none",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`relative z-10 border-t border-white/10 py-2 sm:py-3 px-4 sm:px-6 bg-white/5 backdrop-blur-xl mt-auto transition-all duration-1000 delay-1500 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-3 text-white/60 text-xs">
          <p className="text-center sm:text-left">
            &copy; 2025 Aakash Kalmady.
          </p>
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
