import React from 'react';
import Logo from '../Logo';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <Logo />
        <p className="footer__copyright">2023 © XZstore</p>
      </div>
    </footer>
  );
};

export default Footer;
