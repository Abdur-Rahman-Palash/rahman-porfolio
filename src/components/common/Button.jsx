import React from 'react'

export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`btn btn-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
