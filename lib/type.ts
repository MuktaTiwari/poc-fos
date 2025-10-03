export interface SERPFormData {
  id?: string | number;
  name: string;
  type?: "PERP" | "SERP" | "REGISTRY" | "ORG" | "CU";
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
    id:string;
  }
  
}
