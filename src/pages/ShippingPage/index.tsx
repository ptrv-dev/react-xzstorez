import React from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { ProductItem } from '../../@types/serverResponse';
import appAxios from '../../axios';
import { useAppSelector } from '../../store/store';
import LoadingPage from '../LoadingPage';

interface ShippingForm {
  fullName: string;
  email: string;
  phoneNumber: string;
  country: string;
  city: string;
  state: string;
  address: string;
}

const ShippingPage: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const [products, setProducts] = React.useState<ProductItem[]>([]);

  const [params] = useSearchParams();
  const coupon = params.get('coupon');

  console.log(coupon);

  const fetchProducts = React.useCallback(async () => {
    const products = [];
    for (const item of cartItems) {
      const { data } = await appAxios.get<ProductItem>(`/product/${item._id}`);
      products.push(data);
    }
    setProducts(products);
  }, [cartItems]);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingForm>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit: SubmitHandler<ShippingForm> = async (data) => {
    try {
      setLoading(true);
      const {
        data: { _id },
      } = await appAxios.post('/order/sellix', data);

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

      const response = await appAxios.post('/payment/sellix', {
        cart,
        coupon,
        email: data.email,
        orderId: _id,
      });

      window.location.href = response.data.data.url;
    } catch (error) {
      console.log(error);
      alert('Something going wrong...');
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="shipping">
      <div className="shipping__container container">
        <div className="shipping__header">
          <h2 className="shipping__title section__title">Shipping Details</h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="shipping__form shipping-form"
        >
          <div className="shipping-form__field">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              {...register('email', {
                required: { value: true, message: 'Required' },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Incorrect Email',
                },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="shipping-form__field">
            <label htmlFor="fullName">Full name:</label>
            <input
              type="text"
              id="fullName"
              {...register('fullName', {
                required: { value: true, message: 'Required' },
                minLength: { value: 4, message: 'Minimum length 4' },
                maxLength: { value: 128, message: 'Maximum length 128' },
              })}
            />
            {errors.fullName && <p>{errors.fullName.message}</p>}
          </div>
          <div className="shipping-form__field">
            <label htmlFor="county">Country:</label>
            <input
              type="text"
              id="county"
              {...register('country', {
                required: { value: true, message: 'Required' },
                minLength: { value: 2, message: 'Minimum length 2' },
                maxLength: { value: 128, message: 'Maximum length 128' },
              })}
            />
            {errors.country && <p>{errors.country.message}</p>}
          </div>
          <div className="shipping-form__field">
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              {...register('state', {
                required: { value: true, message: 'Required' },
                minLength: { value: 2, message: 'Minimum length 2' },
                maxLength: { value: 128, message: 'Maximum length 128' },
              })}
            />
            {errors.state && <p>{errors.state.message}</p>}
          </div>
          <div className="shipping-form__field">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              {...register('city', {
                required: { value: true, message: 'Required' },
                minLength: { value: 2, message: 'Minimum length 2' },
                maxLength: { value: 128, message: 'Maximum length 128' },
              })}
            />
            {errors.city && <p>{errors.city.message}</p>}
          </div>
          <div className="shipping-form__field">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              {...register('address', {
                required: { value: true, message: 'Required' },
                minLength: { value: 2, message: 'Minimum length 2' },
                maxLength: { value: 128, message: 'Maximum length 128' },
              })}
            />
            {errors.address && <p>{errors.address.message}</p>}
          </div>
          <div className="shipping-form__field">
            <label htmlFor="phone">Phone number:</label>
            <input
              type="text"
              id="phone"
              {...register('phoneNumber', {
                pattern: {
                  value:
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                  message: 'Incorrect phone number',
                },
              })}
            />
            {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
          </div>
          <button className="btn btn_filled shipping-form__btn">
            Processed to pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingPage;
