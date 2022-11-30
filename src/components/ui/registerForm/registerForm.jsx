import React, { useEffect, useState } from 'react';

import TextField from '../../common/form/textField/textField';
import CheckBoxField from '../../common/form/checkBoxField/checkBoxField';
import Button from '../../common/button/button';

import { validator } from '../../../utils/validateRules';

const RegisterForm = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    license: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    name: {
      isRequired: {
        message: 'Имя обязательно для заполнения'
      },
      min: {
        message: 'Имя должно состоять минимум из 3 символов',
        value: 3
      }
    },
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
    },
    license: {
      isRequired: {
        message:
          'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения'
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
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="6+ символов"
      />
      <CheckBoxField
        value={data.license}
        onChange={handleChange}
        name="license"
        error={errors.license}
      >
        Подтверждая, вы соглашаетесь <a className='inline-block text-[#FF6838]'>с пользовательским соглашением</a>
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
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default RegisterForm;
