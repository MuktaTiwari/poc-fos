"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { FormData } from "../serpAdd/page"; // Type import

interface SerpData {
  id: number;
  keyword: string;
  rank: number;
  url: string;
}

export default function SerpList() {
  const [data, setData] = useState<SerpData[]>([
    { id: 1, keyword: "ReactJS", rank: 1, url: "https://reactjs.org" },
    { id: 2, keyword: "Next.js", rank: 2, url: "https://nextjs.org" },
    { id: 3, keyword: "ShadCN UI", rank: 3, url: "https://ui.shadcn.com" },
  ]);

  const router = useRouter();

  const columns: ColumnDef<SerpData>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "keyword", header: "Keyword" },
    { accessorKey: "rank", header: "Rank" },
    { accessorKey: "url", header: "URL" },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">SERP</h1>
        <button
          onClick={() => router.push("/dashboard/serpAdd")}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-600"
        >
          Add SERP
        </button>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
