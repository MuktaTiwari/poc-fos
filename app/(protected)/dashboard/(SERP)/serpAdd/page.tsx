"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface FormData {
  keyword: string;
  rank: number;
  url: string;
}

export default function SerpAddPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    keyword: "",
    rank: 0,
    url: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rank" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Saved Data:", formData);
    router.push("/dashboard/serpList"); // Redirect after save
  };

  const handleCancel = () => {
    router.push("/dashboard/serpList"); // Redirect on cancel
  };

  return (
    <main className="min-h-screen bg-white p-10">
      <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-10 bg-white">
        <h1 className="text-3xl font-bold mb-6">Add New SERP</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Keyword */}
          <div className="flex flex-col">
            <label htmlFor="keyword" className="text-lg font-medium text-gray-700 mb-2">
              Keyword
            </label>
            <input
              type="text"
              id="keyword"
              name="keyword"
              value={formData.keyword}
              onChange={handleInputChange}
              placeholder="Enter keyword"
              required
              className="border border-gray-300 rounded-md p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Rank */}
          <div className="flex flex-col">
            <label htmlFor="rank" className="text-lg font-medium text-gray-700 mb-2">
              Rank
            </label>
            <input
              type="number"
              id="rank"
              name="rank"
              value={formData.rank}
              onChange={handleInputChange}
              placeholder="Enter rank"
              required
              className="border border-gray-300 rounded-md p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* URL */}
          <div className="flex flex-col">
            <label htmlFor="url" className="text-lg font-medium text-gray-700 mb-2">
              URL
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="Enter URL"
              required
              className="border border-gray-300 rounded-md p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-800"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
