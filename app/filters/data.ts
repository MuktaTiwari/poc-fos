import { FilterState } from "./types";

export const adminTypes = [
    "All Types", "Finance Admin", "Legal Admin", "Sales Admin", 
    "Channel Admin", "Support Admin", "Super Admin", "Admin", "Editor"
];
export const roles = ["All Roles", "Manager", "Staff", "Support"];
export const statuses = ["All Status", "Active", "Inactive", "Pending"];
export const creators = ["All Creators", "John", "Mary", "Alex"];

export const initialFilterState: FilterState = {
  search: "",
  adminType: adminTypes[0], 
  role: roles[0],        
  status: statuses[0],     
  createdBy: creators[0], // 'All Creators'
};
