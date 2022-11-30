import React, { useEffect, useState } from 'react';

import TextField from '../../common/form/textField/textField';
import Button from '../../common/button/button';

import { validator } from '../../../utils/validateRules';
import CheckBoxField from '../../common/form/checkBoxField/checkBoxField';

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения'
      },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одно число'
      },
      min: {
        message: 'Пароль должен состоять минимум из 6 символов',
        value: 6
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();

    if (!isValid) return;

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        id="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        id="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="6+ символов"
      />
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckBoxField>
      <Button
        className={
          'w-full text-lg mt-[30px] py-2 px-8 rounded-[5px] text-white bg-[#FF6838] ' +
          (!isValid ? 'bg-[#FF6838]/40 cursor-not-allowed' : '')
        }
        tag="btn"
        type="submit"
        disabled={!isValid}
      >
        Войти
      </Button>
    </form>
  );
};

export default LoginForm;
