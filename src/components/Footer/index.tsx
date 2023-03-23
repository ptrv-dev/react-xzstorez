import React from 'react';
import Logo from '../Logo';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__contacts container">
        <h4>Our contacts</h4>
        <p>Telegram: @007watches_manager</p>
      </div>
      <div className="footer__container container">
        <p className="footer__copyright">2023 © 007WATCHES</p>
      </div>
    </footer>
  );
};

export default Footer;
