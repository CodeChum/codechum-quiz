import clsx from 'clsx';
import React from 'react';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  name: string;
}

function Icon({ className, name, ...rest }: IconProps) {
  return (
    <span className={clsx('material-symbols-rounded', className)} {...rest}>
      {name}
    </span>
  );
}

export default Icon;
