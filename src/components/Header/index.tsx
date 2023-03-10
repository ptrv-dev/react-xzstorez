import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import useWindowSize from '../../hooks/useWindowSize';

import Logo from '../Logo';
import Search from '../Search';

const navigationList = [
  {
    href: '/',
    title: 'Home',
  },
  {
    href: '/brands',
    title: 'Brands',
  },
  {
    href: '/categories',
    title: 'Categories',
  },
  {
    href: '/all-items',
    title: 'All items',
  },
  {
    href: '/track',
    title: 'Track',
  },
];

const HeaderMenu: React.FC = () => {
  const [active, setActive] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setActive(false);
  }, [location]);

  return (
    <>
      <button
        onClick={() => setActive((prev) => !prev)}
        className={`header-menu ${active ? 'header-menu_active' : ''}`}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={`mobile-nav ${active ? 'mobile-nav_active' : ''}`}>
        <ul className="mobile-nav__list">
          {navigationList.map((item, idx) => (
            <li className="mobile-nav__item">
              <NavLink to={item.href} className="mobile-nav__link">
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

const Header: React.FC = () => {
  const [width] = useWindowSize();

  if (width < 768)
    return (
      <div className="header">
        <div className="header__container container">
          <HeaderMenu />
          <Logo />
          <div className="header__col">
            <Search />
            <Link to={'/cart'} className="header__cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <div className="header">
      <div className="header__container container">
        <div className="header__top header-top">
          <Search />
          <Logo />
          <Link to={'/cart'} className="header__cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </Link>
        </div>
        <nav className="header__nav nav">
          <ul className="nav__list">
            {navigationList.map((item, idx) => (
              <li className="nav__item">
                <NavLink to={item.href} className="nav__link">
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
