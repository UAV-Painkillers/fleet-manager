'use client'

import { PlusCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function AddDroneCard() {
  const onClick = () => {
    alert("Add Drone")
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow flex items-center justify-center"
      onClick={onClick}
    >
      <CardContent className="p-4 text-center">
        <PlusCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
        <p className="text-gray-500">Add New Drone</p>
      </CardContent>
    </Card>
  )
}