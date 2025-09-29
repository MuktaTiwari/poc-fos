"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table"; // for defining columns

// Sample data type
interface SerpData {
  id: number;
  keyword: string;
  rank: number;
  url: string;
}

// Sample data
const data: SerpData[] = [
  { id: 1, keyword: "ReactJS", rank: 1, url: "https://reactjs.org" },
  { id: 2, keyword: "Next.js", rank: 2, url: "https://nextjs.org" },
  { id: 3, keyword: "ShadCN UI", rank: 3, url: "https://ui.shadcn.com" },
];

// Define columns
const columns: ColumnDef<SerpData>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "keyword", header: "Keyword" },
  { accessorKey: "rank", header: "Rank" },
  { accessorKey: "url", header: "URL" },
];

const handleSave = () => {
  console.log("Refresh button clicked!");
};

export default function SerpList() {
  return (
    <div className="p-4">
      {/* Flex container for title and button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">SERP</h1>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-600"
        >
          Add SERP
        </button>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
