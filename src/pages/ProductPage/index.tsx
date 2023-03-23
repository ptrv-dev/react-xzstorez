import React from 'react';
import { useParams } from 'react-router-dom';
import { isAxiosError } from 'axios';
import appAxios from '../../axios';

import LoadingPage from '../LoadingPage';

import { ProductItem } from '../../@types/serverResponse';
import InputNumber from '../../components/InputNumber';
import Button from '../../components/Button';
import { useAppDispatch } from '../../store/store';
import { add } from '../../store/slices/cartSlice';
import useWindowSize from '../../hooks/useWindowSize';
import ProductSlider from '../../components/ProductSlider';

const ProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [width] = useWindowSize();

  const [product, setProduct] = React.useState<ProductItem>();
  const [loading, setLoading] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);

  const [quantity, setQuantity] = React.useState<number>(1);
  const [size, setSize] = React.useState<string | undefined>();

  const fetchProduct = async () => {
    try {
      const { data } = await appAxios.get<ProductItem>(`/product/${id}`);
      setProduct(data);
      if (data.sizes) setSize(data.sizes[0] || undefined);
    } catch (error) {
      if (!isAxiosError(error)) return;
      if (error.response?.status === 404) {
        setNotFound(true);
      }
    }
  };

  React.useEffect(() => {
    fetchProduct();
  }, []);

  if (notFound)
    return (
      <div className="container">
        <h1>Not Found!</h1>
      </div>
    );

  if (!product) return <LoadingPage />;

  if (loading) return <LoadingPage />;

  const handleAddToCart = () => {
    dispatch(add({ _id: product._id, size: size, quantity: quantity }));
  };

  const handleCheckout = async () => {
    try {
      const cart = [
        {
          name: product.title,
          description: size ? `Size: ${size}` : undefined,
          price: product?.price.$numberDecimal,
          quantity,
        },
      ];
      setLoading(true);
      const { data } = await appAxios.post('/payment', { cart: cart });
      window.location.href = data.url;
    } catch (error) {
      console.log(error);
      alert('Something going wrong...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product">
      <div className="product__container container">
        <div className="product__col">
          {width > 768 ? (
            <div className="product__images product-images">
              <div className="product-images__root">
                <img src={`\\${product.images[0]}`} alt={product.title} />
              </div>
              <div className="product-images__list">
                {product.images.slice(1).map((image, idx) => (
                  <div key={idx} className="product-images__img">
                    <img src={`\\${image}`} alt={product.title} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <ProductSlider>
              {product.images.map((image, idx) => (
                <div key={idx} className="product-images__slider-img">
                  <img src={`\\${image}`} alt={product.title} />
                </div>
              ))}
            </ProductSlider>
          )}
        </div>
        <div className="product__col">
          <p className="product__suptitle">007WATCHES</p>
          <h1 className="product__title">{product.title}</h1>
          <p className="product__price">
            {Number(product.price.$numberDecimal).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </p>
          {Boolean(product.sizes?.length) && (
            <div className="product__field">
              <label htmlFor="sizes">Size</label>
              <select
                id="sizes"
                className="select"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                {product.sizes?.map((size, idx) => (
                  <option key={idx}>{size}</option>
                ))}
              </select>
            </div>
          )}
          <div className="product__field">
            <label htmlFor="quantity">Quantity</label>
            <InputNumber
              value={quantity}
              setValue={setQuantity}
              max={10}
              name="quantity"
            />
          </div>
          <div className="product__buttons">
            <Button className="product__button" onClick={handleAddToCart}>
              Add to cart
            </Button>
            <Button
              className="product__button"
              style="filled"
              onClick={handleCheckout}
            >
              Buy it now
            </Button>
          </div>
          {product.description && (
            <div className="product__field">
              <label>Description</label>
              <p className="product__description">{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
