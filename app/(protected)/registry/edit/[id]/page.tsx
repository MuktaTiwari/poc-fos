"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"

import { DashboardHeader } from "@/components/dashboard/header"
import RegistryCreateForm from "@/components/forms/registry-create-form"
import { useRouter } from "next/navigation"
import { env } from "@/env.mjs"

interface Registry {
  id: string;
  name: string;
  type: string;
  isActive: boolean;
  parentId?: string;
  panNo?: string,
  tanNo?: string,
  gstNo?: string,
  address?: string,
  pincode?: string,
  state?: string,
  country?: string,
  immediateParent?: {
    id: string;
  }
}

export default function EditRegistryPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const [registry, setRegistry] = useState<Registry | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      const fetchRegistry = async () => {
        try {
          setLoading(true)
          const response = await axios.get(
            `${env.NEXT_PUBLIC_APP_URL}/business/${id}`
          )
          const data = response.data.data;
          const registryData = {
            ...data,
            parentId: data.immediateParent?.id
          }
          setRegistry(registryData)
          setError(null)
        } catch (err) {
          setError("Failed to fetch registry data.")
          console.error(err)
        } finally {
          setLoading(false)
        }
      }

      fetchRegistry()
    }
  }, [id])

  return (
    <div>
      <DashboardHeader
        heading="Edit Registry"
        text="Edit the details of your Registry."
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && registry && (
        <RegistryCreateForm registry={registry} router={router} />
      )}
      {!loading && !error && !registry && <p>No registry found.</p>}
    </div>
  )
}