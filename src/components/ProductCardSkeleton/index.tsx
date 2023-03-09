import React from 'react';

import style from './ProductCardSkeleton.module.scss';

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className={style['skeleton']}>
      <div className={style['skeleton__image']}></div>
      <div className={style['skeleton__title']}></div>
      <div className={style['skeleton__price']}></div>
    </div>
  );
};

export default ProductCardSkeleton;
