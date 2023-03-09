import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  style?: 'filled' | 'outlined';
  className?: string;
  children: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  style = 'outlined',
  className = '',
  children,
  onClick,
  href,
}) => {
  if (href)
    return (
      <Link to={href} className={`btn btn_${style} ${className}`}>
        {children}
      </Link>
    );
  return (
    <button className={`btn btn_${style} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
