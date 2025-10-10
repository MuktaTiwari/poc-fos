'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Download, Users, Shield, Lock, Filter, Settings } from 'lucide-react';
import { auditLogsData, AuditLog, filterCategories, typeToCategoryMap } from '@/lib/audit-data';
import { ExportModal } from '@/components/audit/export-modal';
import { ExportFilters } from '@/types/audit';
import { downloadCSV } from '@/lib/csv-utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const filterLogs = (log: AuditLog, searchTerm: string) => {
  if (!searchTerm.trim()) return true;
  
  const searchLower = searchTerm.toLowerCase();
  
  return (
    log.action.toLowerCase().includes(searchLower) ||
    log.user.toLowerCase().includes(searchLower) ||
    log.target.toLowerCase().includes(searchLower) ||
    log.description.toLowerCase().includes(searchLower) ||
    log.type.toLowerCase().includes(searchLower) ||
    log.status.toLowerCase().includes(searchLower)
  );
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'All Types':
      return <Filter className="w-4 h-4 mr-2" />;
    case 'User Management':
      return <Users className="w-4 h-4 mr-2" />;
    case 'Permission Changes':
      return <Shield className="w-4 h-4 mr-2" />;
    case 'Security':
      return <Lock className="w-4 h-4 mr-2" />;
    case 'System Config':
      return <Settings className="w-4 h-4 mr-2" />;
    default:
      return <Filter className="w-4 h-4 mr-2" />;
  }
};

export default function AuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All Types');
  const [currentPage, setCurrentPage] = useState(1);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const itemsPerPage = 5;

  const filteredLogs = useMemo(() => {
    return auditLogsData.filter(log => {
      const matchesSearch = filterLogs(log, searchTerm);
      const matchesCategory = categoryFilter === 'All Types' || 
        typeToCategoryMap[log.type] === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter]);

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'User Mgmt':
        return 'default';
      case 'Permissions':
        return 'secondary'; 
      case 'Security':
        return 'destructive'; 
      case 'System':
        return 'outline'; 
      default:
        return 'secondary';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Success':
        return 'default';
      case 'Failed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return '';
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleExportCSV = async (filters: ExportFilters) => {
    setIsExporting(true);
    setExportError(null);
    
    try {
      let exportData = [...auditLogsData];
      
      if (filters.dateRange.from && filters.dateRange.to) {
        exportData = exportData.filter(log => {
          const logDate = new Date(log.timestamp);
          const fromDate = new Date(filters.dateRange.from);
          const toDate = new Date(filters.dateRange.to);
          return logDate >= fromDate && logDate <= toDate;
        });
      }
      
      if (filters.actionType && filters.actionType !== 'All actions') {
        exportData = exportData.filter(log => log.action === filters.actionType);
      }
      
      if (filters.status && filters.status !== 'All status') {
        exportData = exportData.filter(log => log.status === filters.status);
      }

      if (filters.actor) {
        const actorLower = filters.actor.toLowerCase();
        exportData = exportData.filter(log => 
          log.user.toLowerCase().includes(actorLower)
        );
      }

      if (exportData.length === 0) {
        throw new Error('No data matches the selected filters');
      }

      const csvData = exportData.map(log => ({
        Action: log.action,
        User: log.user,
        Target: log.target,
        Timestamp: log.timestamp,
        Status: log.status,
        Type: log.type,
        Description: log.description
      }));

      const filename = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
      downloadCSV(csvData, filename);
      
      setIsExportModalOpen(false);
    } catch (error) {
      setExportError(error instanceof Error ? error.message : 'Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Audit Log</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Monitor and track all system activities and changes
          </p>
        </div>

        {exportError && (
          <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm">{exportError}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExportError(null)}
              className="mt-2 text-destructive hover:bg-destructive/10"
            >
              Dismiss
            </Button>
          </div>
        )}

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium text-foreground">Filter & Search</h4>
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear search
                  </Button>
                )}
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search logs by user, action, target, description, type, or status..."
                    className="w-full pl-10 pr-4 py-2"
                  />
                  {searchTerm && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Badge variant="outline" className="text-xs">
                        {filteredLogs.length} results
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="w-64">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {filterCategories.map(category => (
                        <SelectItem key={category} value={category}>
                          <div className="flex items-center">
                            {getCategoryIcon(category)}
                            {category}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {searchTerm && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                     Search: &quot;{searchTerm}&quot;
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {categoryFilter !== 'All Types' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Type: {categoryFilter}
                    <button
                      onClick={() => setCategoryFilter('All Types')}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="px-8 py-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Audit Logs</CardTitle>
                  <CardDescription className="mt-1">
                    {searchTerm || categoryFilter !== 'All Types' 
                      ? `Showing ${filteredLogs.length} filtered logs` 
                      : 'Track all system activities and administrative changes'
                    }
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setIsExportModalOpen(true)}
                  variant="outline"
                  className="flex items-center gap-2"
                  disabled={filteredLogs.length === 0}
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </Button>
              </div>
            </CardHeader>

            <div className="relative">
              {filteredLogs.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-muted-foreground mb-2">
                    No audit logs found
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {searchTerm || categoryFilter !== 'All Types' 
                      ? 'Try adjusting your search or filter criteria'
                      : 'No audit logs available'
                    }
                  </div>
                  {(searchTerm || categoryFilter !== 'All Types') && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm('');
                        setCategoryFilter('All Types');
                      }}
                      className="mt-4"
                    >
                      Clear all filters
                    </Button>
                  )}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-8 py-4">Action</TableHead>
                      <TableHead className="px-8 py-4">User</TableHead>
                      <TableHead className="px-8 py-4">Target</TableHead>
                      <TableHead className="px-8 py-4">Timestamp</TableHead>
                      <TableHead className="px-8 py-4">Status</TableHead>
                      <TableHead className="px-8 py-4">Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedLogs.map((log) => (
                      <TableRow key={log.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="px-8 py-4">
                          <div className="space-y-1">
                            <div className="font-semibold text-sm text-foreground">
                              {log.action}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {log.description}
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell className="px-8 py-4">
                          <div className="text-sm text-foreground">
                            {log.user}
                          </div>
                        </TableCell>
                        
                        <TableCell className="px-8 py-4">
                          <div className="text-sm text-foreground">
                            {log.target}
                          </div>
                        </TableCell>
                        
                        <TableCell className="px-8 py-4">
                          <div className="text-sm text-muted-foreground">
                            {log.timestamp}
                          </div>
                        </TableCell>
                        
                        <TableCell className="px-8 py-4">
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeStyle(log.status)}`}>
                            {log.status}
                          </div>
                        </TableCell>
                        
                        <TableCell className="px-8 py-4">
                          <Badge variant={getTypeBadgeVariant(log.type)}>
                            {log.type}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>

            {filteredLogs.length > 0 && (
              <div className="px-8 py-4 border-t bg-muted/50">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredLogs.length)} of {filteredLogs.length} logs
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExportCSV}
        isLoading={isExporting}
      />
    </div>
  );
}