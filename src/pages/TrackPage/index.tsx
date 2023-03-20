import React from 'react';
import { getPaymentResponse, trackResponse } from '../../@types/serverResponse';
import appAxios from '../../axios';
import Button from '../../components/Button';
import LoadingPage from '../LoadingPage';

const TrackPage: React.FC = () => {
  const [error, setError] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<trackResponse>();

  const handleTrack = async () => {
    setLoading(true);
    try {
      const { data } = await appAxios.get<trackResponse>(`/track/${value}`);
      setData(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingPage />;

  if (data)
    return (
      <div className="track">
        <div className="track__container container">
          <div className="track__info track-info">
            <h2 className="track-info__title">
              Your order is on its way to you
            </h2>
            <div className="track-info__field">
              <p>Name:</p>
              <strong>{data.fullName}</strong>
            </div>
            <div className="track-info__field">
              <p>Email:</p>
              <strong>{data.email}</strong>
            </div>
            <div className="track-info__field">
              <p>Phone:</p>
              <strong>{data.phone}</strong>
            </div>
            <div className="track-info__field">
              <p>Delivery address:</p>
              <strong>{data.address}</strong>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="track">
      <div className="track__container track__container_sm container">
        <h2 className="track__title">Track your order</h2>
        <p className="track__text">
          Enter your tracking number here to see your order status.
        </p>
        <div className="track__row">
          <input
            type="text"
            placeholder="Enter track number here..."
            className="track__input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            style="filled"
            onClick={handleTrack}
            className="track__button"
          >
            Track
          </Button>
          {error && <p className="track__error">Incorrect track number...</p>}
        </div>
      </div>
    </div>
  );
};

export default TrackPage;
