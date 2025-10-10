export interface AuditLog {
  id: string;
  action: string;
  user: string;
  target: string;
  timestamp: string;
  status: "Success" | "Failed";
  type: string;
  description: string;
}

export interface ExportFilters {
  dateRange: { from: string; to: string };
  actionType: string;
  status: string;
  actor: string;
}

export interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (filters: ExportFilters) => void;
  isLoading?: boolean;
}