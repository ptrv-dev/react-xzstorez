import React from 'react';
import appAxios from '../../axios';
import Button from '../../components/Button';
import CartItem from '../../components/CartItem';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { decrease, increase, remove } from '../../store/slices/cartSlice';

import { CouponItem, ProductItem } from '../../@types/serverResponse';
import { debounce } from '../../utils/debounce';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);
  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  const [oldPrice, setOldPrice] = React.useState<number>(0);
  const [coupon, setCoupon] = React.useState<string>('');
  const [discount, setDiscount] = React.useState<number>(0);
  const [products, setProducts] = React.useState<ProductItem[]>([]);

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
      const { data } = await appAxios.post('/payment', {
        cart,
        coupon: discount ? coupon : undefined,
      });
      window.location.href = data.url;
    } catch (error) {
      console.log(error);
      alert('Something going wrong...');
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
