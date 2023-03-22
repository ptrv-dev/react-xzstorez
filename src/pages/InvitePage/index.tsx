import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import appAxios from '../../axios';
import Button from '../../components/Button';
import LoadingPage from '../LoadingPage';

import style from './InvitePage.module.scss';

interface InviteForm {
  name: string;
  email: string;
  invite1: string;
  invite2: string;
  invite3: string;
  invite4: string;
  invite5: string;
}

const InvitePage: React.FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<InviteForm>();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const onSubmit: SubmitHandler<InviteForm> = async (data) => {
    try {
      setLoading(true);
      [
        data.invite1,
        data.invite2,
        data.invite3,
        data.invite4,
        data.invite5,
      ].forEach((invite) => {
        if (invite === data.email) throw "You can't invite yourself...";
      });
      const payload = {
        name: data.name,
        email: data.email,
        invites: [
          data.invite1,
          data.invite2,
          data.invite3,
          data.invite4,
          data.invite5,
        ]
          .filter((item) => !!item.trim())
          .filter((value, index, array) => array.indexOf(value) === index),
      };
      await appAxios.post('/invite', payload);
      setSuccess(true);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
      reset();
    }
  };

  if (loading) return <LoadingPage />;

  if (success)
    return (
      <div className="container">
        <div className={style['success']}>
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
          <h2 className="section__title">Thank you!</h2>
          <p>
            Invitations have been sent out, when your friends use them you will
            be notified
          </p>
          <Button href="/all-items" style="filled">
            Continue shopping
          </Button>
          <Button
            style="outlined"
            onClick={() => {
              setSuccess(false);
            }}
          >
            Invite more
          </Button>
        </div>
      </div>
    );

  return (
    <div className="container">
      <div className={style['header']}>
        <h2 className="section__title">Invite your friends</h2>
        <p className={style['subtitle']}>
          Invite your friends to join us and get bonuses on the following
          purchases
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={style['form']}>
        <div className={style['group']}>
          <div className={style['field']}>
            <label htmlFor="name">Enter your name:</label>
            <input
              type="text"
              id="name"
              placeholder="Anthony"
              {...register('name', {
                required: {
                  value: true,
                  message: 'Required',
                },
                minLength: {
                  value: 2,
                  message: 'Minimum length 2',
                },
                maxLength: {
                  value: 256,
                  message: 'Maximum length 256',
                },
              })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className={style['field']}>
            <label htmlFor="email">Enter your email address:</label>
            <input
              type="text"
              id="email"
              placeholder="example@mail.com"
              {...register('email', {
                required: {
                  value: true,
                  message: 'Required',
                },
                pattern: {
                  value:
                    /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Invalid Email address',
                },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
        </div>
        <hr />
        <div className={style['field']}>
          <label htmlFor="invite1">Enter your friends emails addresses:</label>
          <input
            type="text"
            placeholder="example@mail.com"
            id="invite1"
            {...register('invite1', {
              required: {
                value: true,
                message: 'Enter at least one Email',
              },
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Invalid Email address',
              },
            })}
          />
          {errors.invite1 && <p>{errors.invite1.message}</p>}
          <div className={style['divider']} />
          <input
            type="text"
            placeholder="example@mail.com"
            {...register('invite2', {
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Invalid Email address',
              },
            })}
          />
          {errors.invite2 && <p>{errors.invite2.message}</p>}
          <div className={style['divider']} />
          <input
            type="text"
            placeholder="example@mail.com"
            {...register('invite3', {
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Invalid Email address',
              },
            })}
          />
          {errors.invite3 && <p>{errors.invite3.message}</p>}
          <div className={style['divider']} />
          <input
            type="text"
            placeholder="example@mail.com"
            {...register('invite4', {
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Invalid Email address',
              },
            })}
          />
          {errors.invite4 && <p>{errors.invite4.message}</p>}
          <div className={style['divider']} />
          <input
            type="text"
            placeholder="example@mail.com"
            {...register('invite5', {
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Invalid Email address',
              },
            })}
          />
          {errors.invite5 && <p>{errors.invite5.message}</p>}
          <div className={style['divider']} />
        </div>
        <button className="btn btn_filled" type="submit">
          Send invites
        </button>
      </form>
    </div>
  );
};

export default InvitePage;
