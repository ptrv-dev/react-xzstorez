import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import useWindowSize from '../../hooks/useWindowSize';
import { useAppSelector } from '../../store/store';

import Logo from '../Logo';
import Search from '../Search';

const navigationList = [
  {
    href: '/',
    title: 'Home',
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
  {
    href: '/invite',
    title: 'Invite your friends',
  },
];

const HeaderMenu: React.FC = () => {
  const [active, setActive] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setActive(false);
  }, [location]);

  React.useEffect(() => {
    active
      ? (window.onscroll = (e) => window.scrollTo(0, 0))
      : (window.onscroll = null);
  }, [active]);

  return (
    <>
      <button
        onClick={() => setActive((prev) => !prev)}
        className={`header-menu ${active ? 'header-menu_active' : ''}`}
      >
        {active ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            role="presentation"
            fill="none"
            viewBox="0 0 18 17"
          >
            <path
              d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z"
              fill="currentColor"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            role="presentation"
            fill="none"
            viewBox="0 0 18 16"
          >
            <path
              d="M1 .5a.5.5 0 100 1h15.71a.5.5 0 000-1H1zM.5 8a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1A.5.5 0 01.5 8zm0 7a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1a.5.5 0 01-.5-.5z"
              fill="currentColor"
            ></path>
          </svg>
        )}
      </button>
      <div
        className={`header__backdrop ${
          active ? 'header__backdrop_active' : ''
        }`}
      />
      <nav className={`mobile-nav ${active ? 'mobile-nav_active' : ''}`}>
        <ul className="mobile-nav__list">
          {navigationList.map((item, idx) => (
            <li className="mobile-nav__item" key={idx}>
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

  const cartItemsCount = useAppSelector((state) => state.cart.items).length;

  if (width < 768)
    return (
      <div className="header">
        <div className="header__announcement">
          <div className="container">
            All orders are processed within 24-48hrs
          </div>
        </div>
        <div className="header__container container">
          <HeaderMenu />
          <Logo />
          <div className="header__col">
            <Search />
            <Link to={'/cart'} className="header__cart">
              {!!cartItemsCount && <span>{cartItemsCount}</span>}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.25"
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
      <div className="header__announcement">
        <div className="container">
          All orders are processed within 24-48hrs
        </div>
      </div>
      <div className="header__container container">
        <div className="header__top header-top">
          <Search />
          <Logo />
          <Link to={'/cart'} className="header__cart">
            {!!cartItemsCount && <span>{cartItemsCount}</span>}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.25"
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
              <li className="nav__item" key={idx}>
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
