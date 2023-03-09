import React from 'react';
import appAxios from '../../axios';

import Button from '../../components/Button';
import BrandCard from '../../components/BrandCard';
import BrandCardSkeleton from '../../components/BrandCardSkeleton';

import { BrandItem, BrandResponse } from '../../@types/serverResponse';

const BrandsPage: React.FC = () => {
  const [brands, setBrands] = React.useState<BrandItem[]>([]);

  const fetchBrands = async () => {
    const { data } = await appAxios.get<BrandResponse>('/brand');
    setBrands(data.data);
  };

  React.useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className="container">
      <div className="section">
        <div className="section__header">
          <h2 className="section__title">Brands</h2>
        </div>
        <div className="section__body">
          <div className="section__grid section__grid_5">
            {brands.length
              ? brands.map((brand) => <BrandCard key={brand._id} {...brand} />)
              : [...Array(10)].map((_, idx) => <BrandCardSkeleton key={idx} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;
