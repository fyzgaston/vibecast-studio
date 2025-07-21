import './AuthPage.scss';
import { useState } from "react";
import RegisterForm from '@/components/RegisterForm';
import LoginForm from '@/components/LoginForm';
import Button from '@/shared/ui/Button';

const AuthPage = () => {
  const [authType, setAuthType] = useState<string>('register');

  const handleClick = () => {
    setAuthType((prevState) =>
    prevState === 'register' ? 'auth' : 'register')
  }

  return (
    <div className='auth-page'>
      <div className='auth-page__inner'>
        <h2 className='h1 auth-page__title'>
          {authType === 'register' ? 'Регистрация' : 'Авторизация'}
        </h2>
        {authType === 'register' ? <RegisterForm/> : <LoginForm/>}
        <Button
          className='auth-page__switch'
          type='button'
          onClick={handleClick}
          label={
            <>
              {authType === 'register' ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '}
              <span className='auth-page__switch-link'>
            {authType === 'register' ? 'Войти' : 'Зарегистрироваться'}
            </span>
            </>
          }
          mode='transparent'
        />
      </div>
    </div>
  )
}

export default AuthPage;