import React from 'react';
import appAxios from '../../axios';

import { CategoryItem, CategoryResponse } from '../../@types/serverResponse';
import { Link } from 'react-router-dom';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = React.useState<CategoryItem[]>([]);

  const fetchCategories = async () => {
    const { data } = await appAxios.get<CategoryResponse>('/category');
    setCategories(data.data);
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="categories">
      <div className="categories__container container">
        <div className="categories__col categories__col_sm">
          <h2 className="categories__title">Categories:</h2>
        </div>
        <div className="categories__col categories__col_lg">
          <div className="categories__list">
            {categories.length
              ? categories.map((category, idx) => (
                  <Link
                    key={category._id}
                    to={`/all-items?category=${category._id}`}
                    className="categories__item"
                  >
                    <span />
                    <strong>
                      {idx + 1 < 10
                        ? '0' + (idx + 1).toString()
                        : (idx + 1).toString()}
                    </strong>
                    {category.title}
                    <span />
                  </Link>
                ))
              : 'loading...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
