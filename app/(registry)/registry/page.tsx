"use client"

import { useEffect, useState } from "react"
import { getColumns, Registry } from "./column"
import { DataTable } from "./data-table"
import axios from "axios"
import { useRouter } from "next/navigation"
import { env } from "@/env.mjs"

export default function DemoPage() {
  const [data, setData] = useState<Registry[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${env.NEXT_PUBLIC_APP_URL}/business?type=REGISTRY`)
        setData(response.data.data)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }

    fetchData()
  }, [])

  const deleteRegistry = async (id: string) => {
    try {
      await axios.delete(`${env.NEXT_PUBLIC_APP_URL}/business/${id}`)
      setData(data.filter((item) => item.id !== id))
    } catch (error) {
      console.error("Failed to delete registry:", error)
    }
  }

  const columns = getColumns(deleteRegistry, router)

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}