import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import 'animate.css';

const Logo = ({
  size = 'md',
  variant = 'default',
  showTagline = false,
  linkTo = '/',
  className = '',
  onClick = null
}) => {
  const sizeClasses = {
    sm: {
      container: 'h-8',
      iconBox: 'w-8 h-8',
      icon: 'w-4 h-4',
      text: 'text-base',
      tagline: 'text-[10px]',
      gap: 'gap-2'
    },
    md: {
      container: 'h-10',
      iconBox: 'w-10 h-10',
      icon: 'w-5 h-5',
      text: 'text-xl',
      tagline: 'text-xs',
      gap: 'gap-2.5'
    },
    lg: {
      container: 'h-12',
      iconBox: 'w-12 h-12',
      icon: 'w-6 h-6',
      text: 'text-2xl',
      tagline: 'text-sm',
      gap: 'gap-3'
    },
    xl: {
      container: 'h-16',
      iconBox: 'w-16 h-16',
      icon: 'w-8 h-8',
      text: 'text-4xl',
      tagline: 'text-base',
      gap: 'gap-4'
    }
  };

  const variantClasses = {
    default: {
      iconBox: 'bg-gradient-to-br from-indigo-600 to-violet-600',
      icon: 'text-white',
      text: 'text-gray-900',
      accent: 'text-indigo-600',
      tagline: 'text-gray-500',
      hover: 'hover:scale-105'
    },
    light: {
      iconBox: 'bg-white/20 backdrop-blur-sm border border-white/30',
      icon: 'text-white',
      text: 'text-white',
      accent: 'text-white',
      tagline: 'text-white/70',
      hover: 'hover:bg-white/30'
    },
    dark: {
      iconBox: 'bg-gradient-to-br from-indigo-500 to-violet-500',
      icon: 'text-white',
      text: 'text-white',
      accent: 'text-indigo-400',
      tagline: 'text-gray-400',
      hover: 'hover:scale-105'
    },
    outline: {
      iconBox: 'border-2 border-indigo-600 bg-transparent',
      icon: 'text-indigo-600',
      text: 'text-gray-900',
      accent: 'text-indigo-600',
      tagline: 'text-gray-500',
      hover: 'hover:bg-indigo-50'
    }
  };

  const currentSize = sizeClasses[size];
  const currentVariant = variantClasses[variant];

  const LogoContent = () => (
    <div
      className={`flex items-center ${currentSize.gap} ${currentSize.container} group transition-all duration-300 ease-out ${currentVariant.hover} animate__animated animate__fadeIn ${className}`}
      onClick={onClick}
    >
      <div
        className={`${currentSize.iconBox} ${currentVariant.iconBox} rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-500/25`}
      >
        <ShoppingBag
          className={`${currentSize.icon} ${currentVariant.icon} transition-transform duration-300 group-hover:-rotate-12`}
          strokeWidth={2.5}
        />
      </div>

      <div className="flex flex-col justify-center">
        <div className={`font-extrabold tracking-tight ${currentSize.text} ${currentVariant.text} leading-none`}>
          Pop<span className={currentVariant.accent}>link</span>
        </div>
        {showTagline && (
          <span className={`font-medium ${currentSize.tagline} ${currentVariant.tagline} leading-none mt-0.5`}>
            Click. Shop. Delivered.
          </span>
        )}
      </div>
    </div>
  );

  return linkTo? (
    <Link to={linkTo} className="inline-block">
      <LogoContent />
    </Link>
  ) : (
    <LogoContent />
  );
};

export default Logo;
