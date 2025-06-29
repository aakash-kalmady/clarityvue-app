"use client";

import { createProfile } from "@/server/profiles";
import { auth } from "@clerk/nextjs/server";
import { useState } from "react";

export default function CreateProfileForm() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    const data = {
      displayName,
      username,
      bio,
      backgroundColor,
    };
    setLoading(true);
    createProfile(data);
  };
  return (
    <div>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
      <input
        type="text"
        value={backgroundColor}
        onChange={(e) => setBackgroundColor(e.target.value)}
      />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}
