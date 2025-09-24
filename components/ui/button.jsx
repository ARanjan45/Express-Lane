import React from 'react'

const buttonStyles = {
  default: "bg-zinc-900 text-zinc-100 hover:bg-zinc-800",
  accent: "bg-blue-500 text-white hover:bg-blue-600",
  outline: "border border-zinc-700 text-zinc-100 hover:bg-zinc-800"
}

// Create a function that mimics class-variance-authority behavior for shadcn/ui compatibility
export const buttonVariants = ({ variant = "default" } = {}) => {
  return `px-4 py-2 rounded-md font-medium transition-colors duration-200 ${buttonStyles[variant] || buttonStyles.default}`
}

export const Button = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${buttonVariants({ variant })} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}