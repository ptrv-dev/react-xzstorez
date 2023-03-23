import React from 'react';

import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link to={'/'} className={`logo ${className}`}>
      007WATCHES
    </Link>
  );
};

export default Logo;
