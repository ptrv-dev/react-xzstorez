import React from 'react';

const Search: React.FC = () => {
  const [active, setActive] = React.useState(false);
  const [search, setSearch] = React.useState<string>('');

  const handleOpen = () => setActive(true);
  const handleClose = () => setActive(false);

  return (
    <div className="search">
      <button className="search__icon" onClick={handleOpen}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 21L15.803 15.803M15.803 15.803C17.2096 14.3964 17.9998 12.4887 17.9998 10.4995C17.9998 8.5103 17.2096 6.60258 15.803 5.196C14.3964 3.78942 12.4887 2.99922 10.4995 2.99922C8.51031 2.99922 6.60258 3.78942 5.196 5.196C3.78943 6.60258 2.99922 8.5103 2.99922 10.4995C2.99922 12.4887 3.78943 14.3964 5.196 15.803C6.60258 17.2096 8.51031 17.9998 10.4995 17.9998C12.4887 17.9998 14.3964 17.2096 15.803 15.803Z"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className={`search__body ${active ? 'search__body_active' : ''}`}>
        <div className="search__container container">
          <input
            type="text"
            className="search__input"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search__close" onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
