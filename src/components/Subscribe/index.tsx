import React from 'react';

const Subscribe: React.FC = () => {
  return (
    <div className="subscribe">
      <div className="subscribe__container container">
        <h2 className="subscribe__title">Subscribe to our emails</h2>
        <p className="subscribe__text">
          Join our email list for exclusive offers and the latest news
        </p>
        <form className="subscribe__form">
          <input
            type="email"
            name="email"
            className="subscribe__input"
            placeholder="Email"
            required
          />
          <button type="submit" className="subscribe__button">
            <svg
              viewBox="0 0 14 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
