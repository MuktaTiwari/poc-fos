"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"

import { DashboardHeader } from "@/components/dashboard/header"
import RegistryCreateForm from "@/components/forms/registry-create-form"

// We can use the same Registry type from the column definition
import { Registry } from "@/app/(registry)/registry-list/column"
import { useRouter } from "next/navigation"

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
            `http://172.1.0.9:3000/business/${id}`
          )
          setRegistry(response.data.data)
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
        heading="Edit Organization"
        text="Edit the details of your organization."
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
