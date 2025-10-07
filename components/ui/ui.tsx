"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mx-auto max-w-7xl rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
    {children}
  </div>
);

export const Input: React.FC<{
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ icon, placeholder, value, onChange }) => (
  <div className="relative">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400">
      {icon}
    </div>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="flex h-10 w-full rounded-md border border-gray-200 bg-white py-2 pl-10 pr-3 text-sm ring-offset-background placeholder:text-gray-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
  </div>
);

export const SelectComponent: React.FC<{
  options: string[];
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}> = ({ options, value, onChange, isOpen, onToggle, onClose }) => {
  const handleSelect = (option: string) => {
    onChange(option);
    onClose();
  };

  return (
    <div className="relative h-10">
      <div
        onClick={onToggle}
        className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-md border px-3 py-2 text-sm text-gray-700 shadow-sm transition-all
          ${isOpen ? "border-blue-500 ring-2 ring-blue-500/50" : "border-gray-200 bg-white hover:border-gray-300"}`}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          className={`ml-2 h-4 w-4 opacity-50 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </div>

      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={`flex cursor-pointer items-center px-4 py-2 text-sm transition-colors hover:bg-gray-50
                ${option === value ? "bg-blue-50 font-medium text-blue-600" : "text-gray-700"}`}
            >
              {option === value && <span className="mr-2 text-lg">✓</span>}
              {option}
            </li>
          ))}
        </ul>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={onClose}
        ></div>
      )}
    </div>
  );
};

export const OutlineButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
}> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      {children}
    </button>
  );
};

export const PrimaryButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
}> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      {children}
    </button>
  );
};