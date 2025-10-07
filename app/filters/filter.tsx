"use client";

import React, { useState, useCallback } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { FilterState } from './types';
import { adminTypes, roles, statuses, creators, initialFilterState } from './data';
import { Card, Input, SelectComponent, OutlineButton, PrimaryButton } from '../../components/ui/ui';
import { useRouter } from "next/navigation"; // ✅ correct import
const FilterBar = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [openSelect, setOpenSelect] = useState<string | null>(null);
  const router = useRouter();

  const handleToggleSelect = (name: string) => {
    setOpenSelect(prev => (prev === name ? null : name));
  };

  const handleCloseSelects = () => {
    setOpenSelect(null);
  };

  const handleChange = useCallback((key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    console.log(`Filter applied: ${key} = ${value}`);
  }, []);

  const handleClear = useCallback(() => {
    setFilters(initialFilterState);
    console.log('🧹 Filters cleared');
  }, []);

  const handleExport = () => {
    console.log("Exporting current data to CSV (Simulated)");
  };

  const handleCreateAdmin = () => {
    console.log("Navigating to new route: /admins/create (Simulated new tab/window path)");
    router.push('/admins/create');
  };

  return (
    <div className="min-h-screen p-4 font-sans sm:p-8">
      
      <div className="mx-auto mb-6 max-w-7xl">
          <div className="flex items-start justify-between">
              <div>
                  <h1 className="text-3xl font-bold text-gray-900">All Admins</h1>
                  <p className="mt-1 text-sm text-gray-500">Manage admin accounts, roles, and permissions for the Primary ERP system.</p>
              </div>
              <div className="flex space-x-3">
                  <OutlineButton onClick={handleExport}>
                      Export CSV
                  </OutlineButton>
                  <PrimaryButton onClick={handleCreateAdmin}>
                      Create Admin
                  </PrimaryButton>
              </div>
          </div>
      </div>

      <Card>
        <div className="mb-6 flex items-center space-x-2 text-gray-800">
          <SlidersHorizontal className="h-5 w-5 text-gray-600" />
          <h2 className="text-xl font-semibold">Filters</h2>
        </div>

        <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-6">

          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-medium leading-none text-gray-700">Search</label>
            <Input
              icon={<Search className="h-4 w-4" />}
              placeholder="Name, Email, Phone..."
              value={filters.search}
              onChange={(e) => handleChange('search', e.target.value)}
            />
          </div>

          <div className="lg:col-span-1">
            <label className="mb-2 block text-sm font-medium leading-none text-gray-700">Admin Type</label>
            <SelectComponent
              options={adminTypes}
              value={filters.adminType}
              onChange={(value) => handleChange('adminType', value)}
              isOpen={openSelect === 'adminType'}
              onToggle={() => handleToggleSelect('adminType')}
              onClose={handleCloseSelects}
            />
          </div>

          <div className="lg:col-span-1">
            <label className="mb-2 block text-sm font-medium leading-none text-gray-700">Role</label>
            <SelectComponent
              options={roles}
              value={filters.role}
              onChange={(value) => handleChange('role', value)}
              isOpen={openSelect === 'role'}
              onToggle={() => handleToggleSelect('role')}
              onClose={handleCloseSelects}
            />
          </div>

          <div className="lg:col-span-1">
            <label className="mb-2 block text-sm font-medium leading-none text-gray-700">Status</label>
            <SelectComponent
              options={statuses}
              value={filters.status}
              onChange={(value) => handleChange('status', value)}
              isOpen={openSelect === 'status'}
              onToggle={() => handleToggleSelect('status')}
              onClose={handleCloseSelects}
            />
          </div>

          <div className="lg:col-span-1">
            <label className="mb-2 block text-sm font-medium leading-none text-gray-700">Created By</label>
            <SelectComponent
              options={creators}
              value={filters.createdBy}
              onChange={(value) => handleChange('createdBy', value)}
              isOpen={openSelect === 'createdBy'}
              onToggle={() => handleToggleSelect('createdBy')}
              onClose={handleCloseSelects}
            />
          </div>
        </div>

        <div className="flex justify-end pt-5">
          <OutlineButton onClick={handleClear}>
            Clear Filters
          </OutlineButton>
        </div>

      </Card>
      
  
    </div>
  );
};

export default FilterBar;