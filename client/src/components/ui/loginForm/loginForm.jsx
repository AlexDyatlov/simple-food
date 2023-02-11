import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TextField from '../../common/form/textField/textField';
import Button from '../../common/button/button';
import CheckBoxField from '../../common/form/checkBoxField/checkBoxField';

import { validator } from '../../../utils/validateRules';
import { getAuthErrors, signIn } from '../../../store/user';

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState({ email: '', password: '', stayOn: false });
  const [errors, setErrors] = useState({});
  const loginError = useSelector(getAuthErrors());

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
      }
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения'
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

    const redirect = history.location.state
      ? history.location.state.from.pathname
      : '/';

    dispatch(signIn({ payload: data, redirect }));
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
      {loginError && <p className="mt-4 text-red-600">{loginError}</p>}
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
