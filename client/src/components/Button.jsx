import React from 'react'

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  const baseStyles = 'font-semibold transition-all duration-300 rounded-lg cursor-pointer'

  const variants = {
    primary: 'bg-accent text-white hover:bg-opacity-80 active:scale-95',
    secondary: 'bg-secondary text-white hover:bg-opacity-80',
    neon: 'bg-neon text-white hover:bg-opacity-80 shadow-glow',
    outline: 'border border-accent text-accent hover:bg-accent hover:text-white',
    ghost: 'text-accent hover:bg-opacity-10',
  }

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
