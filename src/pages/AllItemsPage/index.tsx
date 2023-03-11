import React from 'react';
import { useSearchParams } from 'react-router-dom';
import appAxios from '../../axios';

import ProductCard from '../../components/ProductCard';
import ProductCardSkeleton from '../../components/ProductCardSkeleton';

import {
  BrandItem,
  CategoryItem,
  ProductItem,
  ProductResponse,
} from '../../@types/serverResponse';

const sortVariants = [
  { title: 'Alphabetically, A-Z', sort: 'title', order: 'asc' },
  { title: 'Alphabetically, Z-A', sort: 'title', order: 'desc' },
  { title: 'Price, from high to low', sort: 'price', order: 'desc' },
  { title: 'Price, from low to hight', sort: 'price', order: 'asc' },
];

const AllItemsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category') || '';
  const brandId = searchParams.get('brand') || '';

  const [title, setTitle] = React.useState('All items');
  const [products, setProducts] = React.useState<ProductItem[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [pagesCount, setPagesCount] = React.useState<number>(1);
  const [sort, setSort] = React.useState<string>(
    searchParams.get('sort') || ''
  );
  const [order, setOrder] = React.useState<string>(
    searchParams.get('order') || ''
  );

  const fetchBrand = React.useCallback(async () => {
    const { data } = await appAxios.get<BrandItem>(`/brand/${brandId}`);
    setTitle(data.title);
  }, [brandId]);

  const fetchCategory = React.useCallback(async () => {
    const { data } = await appAxios.get<CategoryItem>(
      `/category/${categoryId}`
    );
    setTitle(data.title);
  }, [categoryId]);

  const fetchProducts = React.useCallback(async () => {
    const { data } = await appAxios.get<ProductResponse>(
      `/product?category=${categoryId}&brand=${brandId}&sort=${sort}&order=${order}&page=${page}`
    );
    setProducts(data.data);
    setPagesCount(data.pagesCount);
  }, [brandId, categoryId, order, page, sort]);

  React.useEffect(() => {
    fetchProducts();

    if (categoryId) fetchCategory();
    else if (brandId) fetchBrand();
    else setTitle('All items');
  }, [brandId, categoryId, fetchBrand, fetchCategory, fetchProducts]);

  const [sortVariant, setSortVariant] = React.useState<number>(0);

  const handleSortChange: React.ChangeEventHandler<HTMLSelectElement> = (e) =>
    setSortVariant(Number(e.target.value));

  React.useEffect(() => {
    setSort(sortVariants[sortVariant].sort);
    setOrder(sortVariants[sortVariant].order);
  }, [sortVariant]);

  return (
    <div className="items">
      <div className="items__container container">
        <div className="items__header">
          <h2 className="section__title">{title}</h2>
          <div className="items__sort">
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" value={sortVariant} onChange={handleSortChange}>
              {sortVariants.map((sort, idx) => (
                <option key={idx} value={idx}>
                  {sort.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="items__body">
          <div className="section__grid">
            {products.length
              ? products.map((product) => (
                  <ProductCard key={product._id} {...product} />
                ))
              : [...Array(12)].map((_, idx) => (
                  <ProductCardSkeleton key={idx} />
                ))}
          </div>
        </div>
        <div className="pagination">
          {page > 1 && (
            <button
              onClick={() => setPage((prev) => prev - 1)}
              className="pagination__button"
            >
              &#60;
            </button>
          )}
          {[...Array(pagesCount)].map((_, idx) => (
            <button
              className={`pagination__button ${
                page === idx + 1 ? 'pagination__button_active' : ''
              }`}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          {page < pagesCount && (
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="pagination__button"
            >
              &#62;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllItemsPage;
