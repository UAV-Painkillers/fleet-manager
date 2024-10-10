"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type NewFrameFormProps = {
  onSubmit: (frameName: string) => void
  onCancel: () => void
}

export function NewFrameForm({ onSubmit, onCancel }: NewFrameFormProps) {
  const [frameName, setFrameName] = useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(frameName)
    setFrameName("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded-md">
      <Label htmlFor="newFrame">New Frame Name</Label>
      <Input
        id="newFrame"
        value={frameName}
        onChange={(e) => setFrameName(e.target.value)}
        placeholder="Enter new frame name"
      />
      <div className="flex justify-end space-x-2 mt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!frameName.trim()}>
          Add Frame
        </Button>
      </div>
    </form>
  )
}