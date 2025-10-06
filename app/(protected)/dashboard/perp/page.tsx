'use client';

import React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { DataTable } from './data-table';
import { DashboardHeader } from '@/components/dashboard/header';
import { toast } from '@/components/ui/use-toast';

import { getColumns } from './columns';
import { getBusinesses, deleteBusiness, updateBusiness, Business } from './api';

export default function PerpPage() {
  const [data, setData] = React.useState<Business[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch PERPs on component mount
  React.useEffect(() => {
    const fetchPERPs = async () => {
      try {
        const businesses = await getBusinesses();
        // Filter only PERP type businesses
        const perpData = businesses.filter(business => business.type === 'PERP');
        setData(perpData);
      } catch (error) {
        console.error('Error fetching PERPs:', error);
        toast({
          title: "Error",
          description: "Failed to fetch PERPs. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPERPs();
  }, []);

  const deletePerp = async (id: string) => {
    try {
      await deleteBusiness(id);
      setData((prev) => prev.filter((p) => p.id !== id));
      toast({
        title: "Success",
        description: "PERP deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting PERP:', error);
      toast({
        title: "Error",
        description: "Failed to delete PERP. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const updatedBusiness = await updateBusiness(id, { isActive });
      setData((prev) => 
        prev.map((p) => 
          p.id === id ? { ...p, isActive: updatedBusiness.isActive } : p
        )
      );
      toast({
        title: "Success",
        description: `PERP ${isActive ? 'activated' : 'deactivated'} successfully.`,
      });
    } catch (error) {
      console.error('Error updating PERP status:', error);
      toast({
        title: "Error",
        description: "Failed to update PERP status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const columns = getColumns(deletePerp, toggleActive);

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-between">
          <DashboardHeader heading="PERPs" text="Manage your PERPs." />
          <Link href="/dashboard/perp/add">
            <Button>Add PERP</Button>
          </Link>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="text-muted-foreground">Loading PERPs...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <DashboardHeader heading="PERPs" text="Manage your PERPs." />
        <Link href="/dashboard/perp/add">
          <Button>Add PERP</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
