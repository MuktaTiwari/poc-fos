export interface SERPFormData {
  id?: string | number;
  name: string;
  type?: "SERP";
  parentId?: string;
  panNo?: string;
  tanNo?: string;
  gstNo?: string;
  address?: string;
  pincode?: string;
  state?: string;
  country?: string;
  isActive?: boolean;
  immediateParent?: {
    id: string;
  }
}

export interface PERPFormData {
  id?: string | number;
  name: string;
  type?: "PERP" | "SERP" | "REGISTRY" | "ORG" | "CU";
  panNo?: string;
  tanNo?: string;
  gstNo?: string;
  address?: string;
  pincode?: string;
  state?: string;
  country?: string;
  isActive?: boolean;
}