"use client";

import { useParams } from "next/navigation";

export default function PublicProfilePage() {
  const params = useParams();
  const { username } = params;
  return <div>{username}</div>;
}
