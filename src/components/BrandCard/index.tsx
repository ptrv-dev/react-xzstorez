import React from 'react';
import { Link } from 'react-router-dom';

import { BrandItem } from '../../@types/serverResponse';

import style from './BrandCard.module.scss';

const BrandCard: React.FC<BrandItem> = ({ _id, title, image }) => {
  return (
    <Link to={`/all-items?brand=${_id}`} className={style['card']}>
      <img className={style['card__image']} src={`\\${image}`} alt={title} />
      <h4 className={style['card__title']}>{title}</h4>
    </Link>
  );
};

export default BrandCard;
