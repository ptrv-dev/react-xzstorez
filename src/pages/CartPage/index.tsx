import React from 'react';
import appAxios from '../../axios';
import Button from '../../components/Button';
import CartItem from '../../components/CartItem';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { decrease, increase, remove } from '../../store/slices/cartSlice';

import { CouponItem, ProductItem } from '../../@types/serverResponse';
import { debounce } from '../../utils/debounce';
import LoadingPage from '../LoadingPage';
import { useNavigate } from 'react-router';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  const [oldPrice, setOldPrice] = React.useState<number>(0);
  const [coupon, setCoupon] = React.useState<string>('');
  const [discount, setDiscount] = React.useState<number>(0);
  const [products, setProducts] = React.useState<ProductItem[]>([]);
  const [paymentMethod, setPaymentMethod] = React.useState<'card' | 'crypto'>(
    'card'
  );

  const fetchProducts = React.useCallback(async () => {
    const products = [];
    for (const item of cartItems) {
      const { data } = await appAxios.get<ProductItem>(`/product/${item._id}`);
      products.push(data);
    }
    setProducts(products);
  }, [cartItems]);

  const calculateTotal = React.useCallback(() => {
    let total = 0;
    cartItems.forEach((item) => {
      const product = products.find((product) => product._id === item._id);
      total += item.quantity * Number(product?.price.$numberDecimal) || 0;
    });
    if (discount) {
      setOldPrice(total);
      setTotalPrice(total - (total * discount) / 100);
    } else {
      setTotalPrice(total);
      setOldPrice(0);
    }
  }, [products, cartItems, discount]);

  const handleCheckout = async () => {
    try {
      const cart = [];
      for (const item of cartItems) {
        const product = products.find((p) => p._id === item._id);
        cart.push({
          name: product?.title,
          description: item.size ? `Size: ${item.size}` : undefined,
          price: product?.price.$numberDecimal,
          quantity: item.quantity,
        });
      }
      if (paymentMethod === 'card') {
        setLoading(true);
        const { data } = await appAxios.post('/payment', {
          cart,
          coupon: discount ? coupon : undefined,
        });
        window.location.href = data.url;
      } else if (paymentMethod === 'crypto') {
        navigate('/order?coupon=' + coupon);
      }
    } catch (error) {
      console.log(error);
      alert('Something going wrong...');
    } finally {
      setLoading(false);
    }
  };

  const fetchCoupon = React.useCallback(async () => {
    try {
      const { data } = await appAxios.get<CouponItem>(
        `/coupon-find?q=${coupon}`
      );
      setDiscount(Number(data.percent.$numberDecimal));
    } catch (error) {
      setDiscount(0);
      return;
    }
  }, [coupon]);

  React.useEffect(() => {
    fetchProducts();
  }, [cartItems, fetchProducts]);

  React.useEffect(() => {
    calculateTotal();
  }, [products, cartItems, calculateTotal]);

  React.useEffect(() => {
    fetchCoupon();
  }, [fetchCoupon]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(event.target.value);
  };

  const debouncedChangeHandler = React.useMemo(() => {
    return debounce(changeHandler, 500);
  }, []);

  if (!cartItems.length)
    return (
      <div className="cart">
        <div className="cart__container container">
          <div className="cart__empty">
            <h2>Your cart is empty</h2>
            <Button href="/all-items" style="filled">
              Continue shopping
            </Button>
          </div>
        </div>
      </div>
    );

  if (loading) return <LoadingPage />;

  return (
    <div className="cart">
      <div className="cart__container container">
        <div className="cart__header">
          <h2 className="section__title">Your cart</h2>
        </div>
        <div className="cart__list">
          {cartItems.map((item, idx) => (
            <CartItem
              key={idx}
              _id={item._id}
              quantity={item.quantity}
              size={item.size}
              onDecrease={() =>
                dispatch(
                  decrease({
                    _id: item._id,
                    size: item.size,
                  })
                )
              }
              onIncrease={() =>
                dispatch(
                  increase({
                    _id: item._id,
                    size: item.size,
                  })
                )
              }
              onRemove={() =>
                dispatch(
                  remove({
                    _id: item._id,
                    size: item.size,
                  })
                )
              }
            />
          ))}
        </div>
        <div className="cart__total">
          <div className="cart__method cart-method">
            <h3 className="cart-method__title">Specify payment method</h3>
            <div className="cart-method__row">
              <div
                className={`cart-method__item ${
                  paymentMethod === 'card' ? 'cart-method__item_active' : ''
                }`}
                onClick={() => {
                  setPaymentMethod('card');
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 5H6C4.34315 5 3 6.34315 3 8V16C3 17.6569 4.34315 19 6 19H18C19.6569 19 21 17.6569 21 16V8C21 6.34315 19.6569 5 18 5Z"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M3 10H21"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M7 15H7.01"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M11 15H13"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                Credit Card
              </div>
              <div
                className={`cart-method__item ${
                  paymentMethod === 'crypto' ? 'cart-method__item_active' : ''
                }`}
                onClick={() => {
                  setPaymentMethod('crypto');
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 6H14C14.7956 6 15.5587 6.31607 16.1213 6.87868C16.6839 7.44129 17 8.20435 17 9C17 9.79565 16.6839 10.5587 16.1213 11.1213C15.5587 11.6839 14.7956 12 14 12C14.7956 12 15.5587 12.3161 16.1213 12.8787C16.6839 13.4413 17 14.2044 17 15C17 15.7956 16.6839 16.5587 16.1213 17.1213C15.5587 17.6839 14.7956 18 14 18H6"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M8 6V18"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M8 12H14"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M9 3V6"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M13 3V6"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M9 18V21"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M13 18V21"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                Crypto
              </div>
            </div>
          </div>
          <div className="cart__field">
            <label htmlFor="coupon">Coupon</label>
            <input
              className="cart__input"
              type="text"
              placeholder="Enter a coupon if you have one"
              // value={coupon}
              onChange={debouncedChangeHandler}
            />
          </div>
          <div className="cart__total-top">
            {Boolean(discount) && <p>Coupon discount ({discount}%)</p>}
            <h4>
              Total{' '}
              {totalPrice.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
              {Boolean(oldPrice) && (
                <span className="cart__old-price">
                  {oldPrice.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </span>
              )}
            </h4>
          </div>
          <Button
            className="cart__total-btn"
            style="filled"
            onClick={handleCheckout}
          >
            Check out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
