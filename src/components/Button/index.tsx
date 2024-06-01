import React, { ReactNode } from 'react';
import Spinner from '../Spinner';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color: 'green' | 'indigo' | 'blue' | 'red';
  size?: 'base' | 'lg';
  isDisabled?: boolean;
  isLoading?: boolean;
  rightIcon?: ReactNode;
  variant?: 'solid' | 'outline';
}

function Button({
  children,
  className,
  color,
  isDisabled,
  isLoading,
  rightIcon,
  size = 'base',
  variant = 'solid',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'flex flex-row items-center justify-center text-center font-heading font-bold text-sm border gap-2 rounded-full transition-colors disabled:opacity-50',
        className,
        {
          'text-neutral-0': variant === 'solid',
          'border-green bg-green hover:bg-green-400':
            color === 'green' && variant === 'solid',
          'border-indigo bg-indigo hover:opacity-90':
            color === 'indigo' && variant === 'solid',
          'border-red bg-red hover:opacity-90':
            color === 'red' && variant === 'solid',
          'border-blue text-blue hover:opacity-80':
            color === 'blue' && variant === 'outline',
          'text-xs p-4': size === 'base',
          'text-lg p-4 md:p-5': size === 'lg',
        }
      )}
      disabled={isDisabled || isLoading}
      {...rest}
    >
      {isLoading && <Spinner />}
      {children}
      {rightIcon}
    </button>
  );
}

export default Button;
