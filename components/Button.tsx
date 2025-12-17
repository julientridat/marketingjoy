import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gold-500 text-luxury-900 hover:bg-gold-400 shadow-lg shadow-gold-500/20 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "bg-luxury-800 text-white hover:bg-luxury-700 border border-luxury-700 disabled:opacity-50",
    outline: "bg-transparent text-gold-500 border border-gold-500 hover:bg-gold-500/10 disabled:opacity-50"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
