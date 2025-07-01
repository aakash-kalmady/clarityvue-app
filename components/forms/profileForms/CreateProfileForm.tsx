"use client";

import { createProfile } from "@/server/actions/profiles";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProfileForm() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    const data = {
      displayName,
      username,
      bio,
    };
    setLoading(true);
    try {
      await createProfile(data);
      setLoading(false);
      router.push("/dashboard");
    } catch (error: any) {
      setLoading(false);
      throw new Error(error);
    }
  };
  return (
    <div>
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
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
