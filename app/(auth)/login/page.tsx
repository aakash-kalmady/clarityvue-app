import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
      {/* Centered Clerk SignIn */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <SignIn routing="hash" />
      </div>
    </main>
  );
}
