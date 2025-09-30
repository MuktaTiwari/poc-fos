"use client"

import Demo from "./demo"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ListOrganization() {
  const router = useRouter()

  return (
    <div className="container mx-auto py-10">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-4xl font-semibold">Organization </h1> 
      </div>
      <Demo />
    </div>
  )
}
