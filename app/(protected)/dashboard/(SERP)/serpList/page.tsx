"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import SerpPopup, { FormData } from "../serpAdd/page";

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

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const columns: ColumnDef<SerpData>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "keyword", header: "Keyword" },
    { accessorKey: "rank", header: "Rank" },
    { accessorKey: "url", header: "URL" },
  ];

  const handleSave = (formData: FormData) => {
    const newSerp: SerpData = {
      id: data.length + 1,
      ...formData,
    };
    setData([...data, newSerp]);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">SERP</h1>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-600"
        >
          Add SERP
        </button>
      </div>

      <DataTable columns={columns} data={data} />

      <SerpPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
