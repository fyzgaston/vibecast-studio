import './LoginForm.scss';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoginSchema, type LoginData} from '@/entities/api/user/schemas.ts';
import {useMutation} from '@tanstack/react-query';
import {loginUser} from '@/entities/api/user/userApi.ts';
import {useNavigate} from 'react-router-dom';
import FormField from '@/shared/ui/FormField';
import Button from '@/shared/ui/Button';
import {setToken, setUsername} from '@/shared/lib/storage.ts';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema)
  })

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: ({username, password}: LoginData) => loginUser(username, password),
    onSuccess: ({ token }, { username }) => {
      setToken(token)
      setUsername(username)
      reset();
      navigate('/tracks');
    }
  })

  const onSubmit =(data: LoginData) => loginMutation.mutate(data);

  return (
    <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='login-form__container'>
        <FormField
          label='Введите ваше имя'
          errorMessage={errors.username?.message}
          type='text'
          {...register('username')}
          placeholder='Василий Пупкин'
        />
        <FormField
          label='Придумайте пароль'
          errorMessage={errors.password?.message}
          type='password'
          {...register('password')}
        />
      </div>

      <Button
        type='submit'
        label='Войти'
        mode='orange-01-bg'
      />

      {loginMutation.error && (
        <span>{loginMutation.error.message}</span>
      )}
    </form>
  )
}

export default LoginForm;