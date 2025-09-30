"use client";

import { useParams } from "next/navigation";

export default function SerpEditPage() {
  const params = useParams();
  const name = params.name; // comes from the URL

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Edit SERP: {name}</h1>
      {/* Your form to edit the SERP */}
    </div>
  );
}
