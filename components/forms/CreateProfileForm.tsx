"use client";

import { createProfile } from "@/server/profiles";
import { auth, currentUser } from "@clerk/nextjs/server";
import { useState } from "react";

export default function CreateProfileForm() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    const data = {
      displayName,
      username,
      bio,
      backgroundColor,
    };
    setLoading(true);
    try {
      await createProfile(data);
      setLoading(false);
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
        placeholder="Bio (Optional)"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <input
        type="text"
        placeholder="Background Color (Optional)"
        value={backgroundColor}
        onChange={(e) => setBackgroundColor(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
