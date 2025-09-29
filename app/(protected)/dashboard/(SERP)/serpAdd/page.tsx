"use client";

import { useState } from "react";

export interface FormData {
  keyword: string;
  rank: number;
  url: string;
}

interface SerpPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
}

export default function SerpPopup({ isOpen, onClose, onSave }: SerpPopupProps) {
  const [formData, setFormData] = useState<FormData>({
    keyword: "",
    rank: 0,
    url: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rank" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ keyword: "", rank: 0, url: "" });
    onClose();
  };

  const handleCancel = () => {
    setFormData({ keyword: "", rank: 0, url: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg overflow-auto animate-fadeIn">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New SERP</h2>
          <button
            className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
            onClick={handleCancel}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="flex flex-col">
            <label htmlFor="keyword" className="text-sm font-medium text-gray-700 mb-1">
              Keyword:
            </label>
            <input
              type="text"
              id="keyword"
              name="keyword"
              value={formData.keyword}
              onChange={handleInputChange}
              placeholder="Enter keyword"
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="rank" className="text-sm font-medium text-gray-700 mb-1">
              Rank:
            </label>
            <input
              type="number"
              id="rank"
              name="rank"
              value={formData.rank}
              onChange={handleInputChange}
              placeholder="Enter rank"
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="url" className="text-sm font-medium text-gray-700 mb-1">
              URL:
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="Enter URL"
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
