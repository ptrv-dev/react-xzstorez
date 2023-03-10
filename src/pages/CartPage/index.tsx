import React from 'react';
import { ProductItem } from '../../@types/serverResponse';
import appAxios from '../../axios';
import Button from '../../components/Button';
import InputNumber from '../../components/InputNumber';
import { decrease, increase, remove } from '../../store/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);
  const [totalPrice, setTotalPrice] = React.useState<number>(0);

  const [products, setProducts] = React.useState<ProductItem[]>([]);

  const fetchProducts = React.useCallback(async () => {
    const products = [];
    for (const item of cartItems) {
      const { data } = await appAxios.get<ProductItem>(`/product/${item._id}`);
      products.push(data);
    }
    setProducts(products);
  }, []);

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      const product = products.find((product) => product._id === item._id);
      total += item.quantity * Number(product?.price.$numberDecimal) || 0;
    });
    setTotalPrice(total);
  };

  React.useEffect(() => {
    fetchProducts();
  }, [cartItems]);

  React.useEffect(() => {
    calculateTotal();
  }, [products, cartItems]);

  console.log('CART ITEMS', cartItems);
  console.log('PRODUCTS', products);

  return (
    <div className="cart">
      <div className="cart__container container">
        {cartItems.length ? (
          <>
            <div className="cart__header">
              <h2 className="section__title">Your cart</h2>
            </div>
            <div className="cart__list">
              {cartItems.map((item, idx) => {
                const product = products.find(
                  (product) => product._id === item._id
                );
                if (!product) return 'error';
                return (
                  <div key={idx} className="cart-item">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="cart-item__image"
                    />
                    <div className="cart-item__col cart-item__col_lg">
                      <h4 className="cart-item__title">{product.title}</h4>
                      <p className="cart-item__price">
                        {Number(product.price.$numberDecimal).toLocaleString(
                          'en-US',
                          {
                            style: 'currency',
                            currency: 'USD',
                          }
                        )}
                      </p>
                      {cartItems[idx]?.size && (
                        <p className="cart-item__size">
                          Size: {cartItems[idx].size}
                        </p>
                      )}
                    </div>
                    <div className="cart-item__col cart-item__col_row">
                      <InputNumber
                        value={cartItems[idx]?.quantity}
                        onIncrease={() => {
                          dispatch(
                            increase({
                              _id: cartItems[idx]._id,
                              size: cartItems[idx].size,
                            })
                          );
                        }}
                        onDecrease={() => {
                          dispatch(
                            decrease({
                              _id: cartItems[idx]._id,
                              size: cartItems[idx].size,
                            })
                          );
                        }}
                      />
                      <button
                        className="cart-item__remove"
                        onClick={() => {
                          dispatch(
                            remove({
                              _id: product._id,
                              size: cartItems[idx].size,
                            })
                          );
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.82667 6.00001L9.596 12M6.404 12L6.17333 6.00001M12.8187 3.86001C13.0467 3.89468 13.2733 3.93135 13.5 3.97068M12.8187 3.86001L12.1067 13.1153C12.0776 13.4922 11.9074 13.8441 11.63 14.1008C11.3527 14.3576 10.9886 14.5001 10.6107 14.5H5.38933C5.0114 14.5001 4.64735 14.3576 4.36999 14.1008C4.09262 13.8441 3.92239 13.4922 3.89333 13.1153L3.18133 3.86001M12.8187 3.86001C12.0492 3.74369 11.2758 3.65541 10.5 3.59535M3.18133 3.86001C2.95333 3.89401 2.72667 3.93068 2.5 3.97001M3.18133 3.86001C3.95076 3.74369 4.72416 3.65541 5.5 3.59535M10.5 3.59535V2.98468C10.5 2.19801 9.89333 1.54201 9.10667 1.51735C8.36908 1.49377 7.63092 1.49377 6.89333 1.51735C6.10667 1.54201 5.5 2.19868 5.5 2.98468V3.59535M10.5 3.59535C8.83581 3.46673 7.16419 3.46673 5.5 3.59535"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="cart-item__col">
                      {(
                        Number(product.price.$numberDecimal) *
                        cartItems[idx].quantity
                      ).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="cart__total">
              <h4>
                Total{' '}
                {totalPrice.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </h4>
              <Button className="cart__total-btn" style="filled">
                Check out
              </Button>
            </div>
          </>
        ) : (
          <div className="cart__empty">
            <h2>Your cart is empty</h2>
            <Button href="/all-items" style="filled">
              Continue shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
