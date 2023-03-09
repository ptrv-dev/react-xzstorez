import React from 'react';
import { Link } from 'react-router-dom';
import { ProductItem } from '../../@types/serverResponse';

import style from './ProductCard.module.scss';

const ProductCard: React.FC<ProductItem> = ({ _id, images, title, price }) => {
  return (
    <Link to={`/product/${_id}`} className={style['card']}>
      <img
        className={style['card__image']}
        src={`\\${images[0]}`}
        alt={title}
      />
      <div className={style['card__body']}>
        <h4 className={style['card__title']}>{title}</h4>
        <p className={style['card__price']}>
          {Number(price.$numberDecimal).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
