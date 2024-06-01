import clsx from 'clsx';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label: string;
}

function Input({ label, error, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <input
          className={clsx(
            'peer font-body text-base text-neutral-700 rounded-t-xl pb-2 px-4 pt-6 bg-neutral-50 border-b-2 border-neutral-400 focus:border-blue-300 w-full outline-none placeholder-transparent',
            {
              'border-red-300': !!error,
            }
          )}
          placeholder={label}
          {...rest}
        />
        <label className="absolute font-body text-neutral-400 left-4 top-2 pointer-events-none text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:text-xs peer-focus:top-2 transition-all">
          {label}
        </label>
      </div>
      {error && <p className="text-sm text-red-300 pl-4">{error}</p>}
    </div>
  );
}

export default Input;
