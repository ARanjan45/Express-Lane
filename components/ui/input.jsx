// Replace your app/components/ui/input.jsx with this:
import * as React from "react"

function Input({
  className = "",
  type = "text",
  ...props
}) {
  const baseClasses = "flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
  
  return (
    <input
      type={type}
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
}

export { Input }