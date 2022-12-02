import React, { useState } from 'react';
import { useParams } from 'react-router';

import Title from '../../common/title/title';
import LoginForm from '../loginForm/loginForm';
import RegisterForm from '../registerForm/registerForm';

const Login = ({ close }) => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === 'register' ? type : 'login'
  );

  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === 'register' ? 'login' : 'register'
    );
  };

  return (
    <>
      {formType === 'register' ? (
        <>
          <Title className="text-2xl font-medium text-[#363853] mb-5" tag="h3">
            Регистрация
          </Title>
          <RegisterForm close={close} />
          <p className='mt-4'>
            Есть аккаунт ? <button className='text-[#1e43ff] underline underline-offset-2' type='button' onClick={toggleFormType}>Войти</button>{' '}
          </p>
        </>
      ) : (
        <>
          <Title className="text-2xl font-medium text-[#363853] mb-5" tag="h3">
            Вход на сайт
          </Title>
          <LoginForm />
          <p className='mt-4'>
            Нет учетной записи ? <button className='text-[#1e43ff] underline underline-offset-2' type='button' onClick={toggleFormType}>Зарегистрироваться</button>{' '}
          </p>
        </>
      )}
    </>
  );
};

export default Login;
