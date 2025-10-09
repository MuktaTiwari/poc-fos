"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

import {
  Card,
  Input,
  SelectComponent,
  OutlineButton,
  PrimaryButton,
} from "../../../../components/ui/ui";
import { FilterState } from "./types";
import { AllAdminData } from "../columns";

// ✅ Define initial filter state
const initialFilterState: FilterState = {
  search: "",
  role: "",
  status: "",
  createdBy: "",
};

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  data: AllAdminData[];
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters, data }) => {
  const [openSelect, setOpenSelect] = useState<string | null>(null);

  // ✅ State for dropdown data
  const [roles, setRoles] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [creators, setCreators] = useState<string[]>([]);

  const router = useRouter();

  // ✅ Fetch data from db.json
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/users");
        const UserData = response.data;

        // ✅ Extract unique values
        const uniqueRoles = Array.from(new Set(UserData.map((item: any) => item.roles))) as string[];
        const uniqueStatuses = Array.from(new Set(UserData.map((item: any) => item.status))) as string[];
        const uniqueCreators = Array.from(new Set(UserData.map((item: any) => item.createdBy))) as string[];

        setRoles(uniqueRoles);
        setStatuses(uniqueStatuses);
        setCreators(uniqueCreators);
      } catch (error) {
        console.error("Error fetching business data:", error);
      }
    };

    fetchUserData();
  }, []);




  const handleToggleSelect = (name: string) => {
    setOpenSelect((prev) => (prev === name ? null : name));
  };

  const handleCloseSelects = () => {
    setOpenSelect(null);
  };

  const handleChange = useCallback((key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleClear = useCallback(() => {
    setFilters(initialFilterState);
  }, []);

  const handleExport = () => {
    console.log("Exporting current data to CSV (Simulated)");
  };

  const handleCreateAdmin = () => {
    router.push("/allAdmin/create");
  };

  return (
    <div>
      {/* Header Section */}
      <div className="mx-auto mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Admins</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage admin accounts, roles, and permissions for the Primary ERP system.
            </p>
          </div>
          <div className="flex space-x-3">
            <OutlineButton onClick={handleExport}>Export CSV</OutlineButton>
            <PrimaryButton onClick={handleCreateAdmin}>Create Admin</PrimaryButton>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <Card>
        <div className="mb-6 flex items-center space-x-2 text-gray-800">
          <SlidersHorizontal className="size-5 text-gray-600" />
          <h2 className="text-xl font-semibold">Filters</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Search */}
          <div>
            <label className="mb-2 block text-sm font-medium leading-none text-gray-700">
              Search
            </label>
            <Input
              icon={<Search className="size-4" />}
              placeholder="Name, Email, Phone..."
              value={filters.search}
              onChange={(e) => handleChange("search", e.target.value)}
            />
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm font-medium leading-none text-gray-700">
              Role
            </label>
            <SelectComponent
              options={roles}
              value={filters.role}
              onChange={(value) => handleChange("role", value)}
              isOpen={openSelect === "role"}
              onToggle={() => handleToggleSelect("role")}
              onClose={handleCloseSelects}
              placeholder="All Role"

            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium leading-none text-gray-700">
              Status
            </label>
            <SelectComponent
              options={statuses}
              value={filters.status}
              onChange={(value) => handleChange("status", value)}
              isOpen={openSelect === "status"}
              onToggle={() => handleToggleSelect("status")}
              onClose={handleCloseSelects}
              placeholder="All Status"

            />
          </div>

          {/* Created By */}
          <div>
            <label className="mb-2 block text-sm font-medium leading-none text-gray-700">
              Created By
            </label>
            <SelectComponent
              options={creators}
              value={filters.createdBy}
              onChange={(value) => handleChange("createdBy", value)}
              isOpen={openSelect === "createdBy"}
              onToggle={() => handleToggleSelect("createdBy")}
              onClose={handleCloseSelects}
              placeholder="All Creators"

            />
          </div>
        </div>

        <div className="flex justify-end pt-5">
          <OutlineButton onClick={handleClear}>Clear Filters</OutlineButton>
        </div>
      </Card>
    </div>
  );
};

export default FilterBar;
