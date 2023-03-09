import React from 'react';

import style from './InputNumber.module.scss';

interface InputNumberProps {
  value?: number;
  setValue?: React.Dispatch<React.SetStateAction<number>>;
  min?: number;
  max?: number;
  name?: string;
}

const InputNumber: React.FC<InputNumberProps> = ({
  value,
  setValue,
  min = 1,
  max = 999999,
  name,
}) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      if (!setValue) return;
      if (Number(e.target.value) <= min) return setValue(min);
      if (Number(e.target.value) >= max) return setValue(max);
      setValue(Number(e.target.value));
    }
  };

  const handleDecrease = () => {
    if (!setValue || !value || value <= min) return;
    setValue(value - 1);
  };
  const handleIncrease = () => {
    if (!setValue || !value || value >= max) return;
    setValue(value + 1);
  };

  return (
    <div className={style['number']}>
      <button className={style['number__button']} onClick={handleDecrease}>
        -
      </button>
      <input
        id={name}
        type="text"
        value={value}
        className={style['number__input']}
        onChange={handleChange}
      />
      <button className={style['number__button']} onClick={handleIncrease}>
        +
      </button>
    </div>
  );
};

export default InputNumber;
