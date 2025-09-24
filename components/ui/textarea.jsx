import * as React from "react"
import { cn } from "../../lib/utils"

function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }