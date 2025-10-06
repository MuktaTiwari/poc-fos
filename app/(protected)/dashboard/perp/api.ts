"use server";

import { revalidatePath } from "next/cache";

const API_URL = "http://localhost:3000/business";

export interface Business {
  id: string;
  name: string;
  type: "PERP" | "SERP" | "REGISTRY" | "ORGANIZATION" | "CU";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getBusinesses(): Promise<Business[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch businesses: ${response.statusText}`);
    }
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to retrieve businesses");
    }
    return result.data;
  } catch (error) {
    console.error("Error in getBusinesses:", error);
    throw error;
  }
}

export async function createBusiness(data: { name: string; type: string }): Promise<Business> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to create business: ${response.statusText}`);
    }
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to create business");
    }
    revalidatePath("/dashboard/perp");
    return result.data;
  } catch (error) {
    console.error("Error in createBusiness:", error);
    throw error;
  }
}

export async function updateBusiness(id: string, data: { name?: string; type?: string; isActive?: boolean }): Promise<Business> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to update business: ${response.statusText}`);
    }
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to update business");
    }
    revalidatePath("/dashboard/perp");
    revalidatePath(`/dashboard/perp/${id}`);
    return result.data;
  } catch (error) {
    console.error("Error in updateBusiness:", error);
    throw error;
  }
}

export async function deleteBusiness(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete business: ${response.statusText}`);
    }
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to delete business");
    }
    revalidatePath("/dashboard/perp");
  } catch (error) {
    console.error("Error in deleteBusiness:", error);
    throw error;
  }
}
