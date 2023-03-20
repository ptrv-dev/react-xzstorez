import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import appAxios from '../../axios';
import LoadingPage from '../LoadingPage';

const OrderCompletePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [orderNumber, setOrderNumber] = React.useState<string | undefined>();
  const [loading, setLoading] = React.useState(true);

  const merchant = searchParams.get('merchant');

  const createOrder = async () => {
    try {
      const { data } = await appAxios.post('/order', {
        session_id: searchParams.get('session_id'),
      });
      setOrderNumber(data.track);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert('Error!');
    }
  };

  const sellixOrder = async () => {
    try {
      const uniqueId = searchParams.get('uniqueId');
      const orderId = searchParams.get('orderId');
      const { data } = await appAxios.post('/order/sellix/check', {
        uniqueId,
        orderId,
      });
      setOrderNumber(data.track);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert('Error!');
    }
  };

  React.useEffect(() => {
    if (merchant === 'sellix') {
      sellixOrder();
    } else {
      createOrder();
    }
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <div className="complete">
      <div className="complete__container container">
        <svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M36 51L45 60L60 39M84 48C84 52.7276 83.0688 57.4089 81.2597 61.7766C79.4505 66.1443 76.7988 70.1129 73.4558 73.4558C70.1129 76.7988 66.1443 79.4505 61.7766 81.2597C57.4089 83.0688 52.7276 84 48 84C43.2724 84 38.5911 83.0688 34.2234 81.2597C29.8557 79.4505 25.8871 76.7988 22.5442 73.4558C19.2012 70.1129 16.5495 66.1443 14.7403 61.7766C12.9312 57.4089 12 52.7276 12 48C12 38.4522 15.7928 29.2955 22.5442 22.5442C29.2955 15.7928 38.4522 12 48 12C57.5478 12 66.7045 15.7928 73.4558 22.5442C80.2072 29.2955 84 38.4522 84 48Z"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h2 className="section__title">Thank you for the order!</h2>
        <p>
          Your order number: {orderNumber}
          <br />
          You can track your order on the <Link to={'/track'}>Track page</Link>
        </p>
      </div>
    </div>
  );
};

export default OrderCompletePage;
