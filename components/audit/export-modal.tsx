'use client';

import { useState } from 'react';
import { ExportFilters, ExportModalProps } from '@/types/audit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function ExportModal({ isOpen, onClose, onExport, isLoading = false }: ExportModalProps) {
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
    from: '',
    to: ''
  });
  const [actionType, setActionType] = useState<string>('All actions');
  const [status, setStatus] = useState<string>('All status');
  const [actor, setActor] = useState<string>('');
  const [errors, setErrors] = useState<{ dateRange?: string }>({});

  const actionTypes: string[] = [
    'All actions',
    'Create Admin',
    'Delete Admin', 
    'Edit Admin',
    'Login Attempt',
    'Change Permissions'
  ];

  const statuses: string[] = [
    'All status',
    'Success',
    'Failed',
    'Blocked'
  ];

  const validateDateRange = (from: string, to: string): boolean => {
    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      
      if (fromDate > toDate) {
        setErrors({ dateRange: 'From date cannot be after To date' });
        return false;
      }
    }
    setErrors({});
    return true;
  };

  const handleDateChange = (field: 'from' | 'to', value: string): void => {
    const newDateRange = { ...dateRange, [field]: value };
    setDateRange(newDateRange);
    
    if (newDateRange.from && newDateRange.to) {
      validateDateRange(newDateRange.from, newDateRange.to);
    }
  };

  const handleExport = (): void => {
    if (!validateDateRange(dateRange.from, dateRange.to)) {
      return;
    }

    const filters: ExportFilters = {
      dateRange,
      actionType,
      status,
      actor
    };
    
    onExport(filters);
  };

  const handleClose = (): void => {
    setDateRange({ from: '', to: '' });
    setActionType('All actions');
    setStatus('All status');
    setActor('');
    setErrors({});
    onClose();
  };

  const isExportDisabled: boolean = !dateRange.from || !dateRange.to || !!errors.dateRange || isLoading;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Export Audit Logs</DialogTitle>
          <DialogDescription>
            Select filters to customize the audit data you want to export.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="date-range" className="text-sm font-medium">
              Date Range *
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="date-from" className="text-xs">From</Label>
                <Input
                  id="date-from"
                  type="date"
                  value={dateRange.from}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDateChange('from', e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-to" className="text-xs">To</Label>
                <Input
                  id="date-to"
                  type="date"
                  value={dateRange.to}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDateChange('to', e.target.value)}
                  className="w-full"
                  required
                />
              </div>
            </div>
            {errors.dateRange && (
              <p className="text-sm text-destructive">{errors.dateRange}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="action-type" className="text-sm font-medium">
              Action Type
            </Label>
            <Select value={actionType} onValueChange={setActionType}>
              <SelectTrigger id="action-type" className="w-full">
                <SelectValue placeholder="Select action type" />
              </SelectTrigger>
              <SelectContent>
                {actionTypes.map((type: string) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="actor" className="text-sm font-medium">
              Actor
            </Label>
            <Input
              id="actor"
              type="text"
              placeholder="Search by email or name"
              value={actor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setActor(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium">
              Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((statusOption: string) => (
                  <SelectItem key={statusOption} value={statusOption}>
                    {statusOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="flex-1 sm:flex-none"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleExport}
            className="flex-1 sm:flex-none"
            disabled={isExportDisabled}
          >
            {isLoading ? 'Exporting...' : 'Export CSV'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}