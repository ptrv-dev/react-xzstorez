import React from 'react';

import style from './BrandCardSkeleton.module.scss';

const BrandCardSkeleton: React.FC = () => {
  return (
    <div className={style['skeleton']}>
      <div className={style['skeleton__image']}></div>
      <div className={style['skeleton__title']}></div>
    </div>
  );
};

export default BrandCardSkeleton;
