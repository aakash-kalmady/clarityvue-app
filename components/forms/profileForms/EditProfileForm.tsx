"use client";

import { getProfile, updateProfile } from "@/server/actions/profiles";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

export default function EditProfileForm() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleLoad = async () => {
      const { userId } = useAuth();
      if (!userId) throw new Error();
      const profile = await getProfile(userId);
      if (!profile) throw new Error();
      setDisplayName(profile.displayName);
      setUsername(profile.username);
      setBio(profile.bio);
    };
    handleLoad();
  }, []);

  const handleSubmit = async () => {
    const data = {
      displayName,
      username,
      bio,
    };
    setLoading(true);
    try {
      await updateProfile(data);
      setLoading(false);
      router.push("/dashboard");
    } catch (error: any) {
      setLoading(false);
      throw new Error(error);
    }
  };
  return (
    <div>
      <Link className="bg-black text-white text-center" href={"/dashboard"}>
        Home
      </Link>
      <input
        type="text"
        placeholder="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Bio (Optional)"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
