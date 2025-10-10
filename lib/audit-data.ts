import { AuditLog } from '@/types/audit';

const generateTimestamp = (daysAgo: number, time: string) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  const [year, month, day] = date.toISOString().split('T')[0].split('-');
  return `${year}-${month}-${day} ${time}`;
};

export const auditLogsData: AuditLog[] = [
  {
    id: "1",
    action: "User Created",
    user: "admin@tspoc.com",
    target: "john.smith@company.com",
    timestamp: generateTimestamp(0, "14:32:15"),
    status: "Success",
    type: "User Mgmt",
    description: "Created new user account for John Smith"
  },
  {
    id: "2",
    action: "Permission Modified",
    user: "admin@tspoc.com",
    target: "sarah.johnson@company.com",
    timestamp: generateTimestamp(0, "13:45:22"),
    status: "Success",
    type: "Permissions",
    description: "Updated user permissions for Finance module"
  },
  {
    id: "3",
    action: "Login Attempt",
    user: "system",
    target: "unknown.user@fake.com",
    timestamp: generateTimestamp(0, "12:18:33"),
    status: "Failed",
    type: "Security",
    description: "Failed login attempt from suspicious IP"
  },
  {
    id: "4",
    action: "System Settings",
    user: "admin@tspoc.com",
    target: "Database Configuration",
    timestamp: generateTimestamp(0, "11:20:45"),
    status: "Success",
    type: "System",
    description: "Updated database connection timeout settings"
  },
  {
    id: "5",
    action: "User Deleted",
    user: "dept.admin@company.com",
    target: "temp.user@company.com",
    timestamp: generateTimestamp(0, "10:15:12"),
    status: "Success",
    type: "User Mgmt",
    description: "Deleted temporary user account"
  },
  {
    id: "6",
    action: "Role Assigned",
    user: "admin@tspoc.com",
    target: "mike.wilson@company.com",
    timestamp: generateTimestamp(1, "16:30:45"),
    status: "Success",
    type: "Permissions",
    description: "Assigned Manager role to user"
  },
  {
    id: "7",
    action: "Password Changed",
    user: "system",
    target: "jane.doe@company.com",
    timestamp: generateTimestamp(1, "15:22:33"),
    status: "Success",
    type: "Security",
    description: "User changed password successfully"
  },
  {
    id: "8",
    action: "Login Attempt",
    user: "unknown@external.com",
    target: "admin@tspoc.com",
    timestamp: generateTimestamp(1, "14:15:27"),
    status: "Failed",
    type: "Security",
    description: "Multiple failed login attempts detected"
  },
  {
    id: "9",
    action: "Data Export",
    user: "reports@tspoc.com",
    target: "User Data",
    timestamp: generateTimestamp(1, "13:08:19"),
    status: "Success",
    type: "System",
    description: "Exported user data for monthly report"
  },
  {
    id: "10",
    action: "API Access",
    user: "integration@partner.com",
    target: "REST API",
    timestamp: generateTimestamp(1, "12:45:33"),
    status: "Success",
    type: "System",
    description: "External API access granted"
  }
];

export const filterCategories = [
  "All Types",
  "User Management", 
  "Permission Changes",
  "Security",
  "System Config"
];

export const typeToCategoryMap: { [key: string]: string } = {
  "User Mgmt": "User Management",
  "Permissions": "Permission Changes", 
  "Security": "Security",
  "System": "System Config"
};


export type { AuditLog };