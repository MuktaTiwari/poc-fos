"use client"

import { useEffect, useState } from "react"
import { getColumns, Registry } from "./column"
import { DataTable } from "./data-table"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function DemoPage() {
  const [data, setData] = useState<Registry[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://172.1.0.9:3000/business")
        setData(response.data.data)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }

    fetchData()
  }, [])

  const deleteRegistry = async (id: string) => {
    try {
      await axios.delete(`http://172.1.0.9:3000/business/${id}`)
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