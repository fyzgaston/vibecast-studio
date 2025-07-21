import './RegisterForm.scss';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {useMutation} from "@tanstack/react-query";
import {type RegisterData, RegisterSchema} from '@/entities/api/user/schemas.ts';
import {registerUser} from '@/entities/api/user/userApi.ts';
import FormField from '@/shared/ui/FormField';
import Button from '@/shared/ui/Button';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema)
  });

  const registrationMutation = useMutation({
    mutationFn: ({username, password}: RegisterData)  => registerUser(username, password)
  })

  const onSubmit = (data: RegisterData) => {
    registrationMutation.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form className='register-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='register-form__container'>
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
        label='Зарегистрироваться'
        mode='orange-01-bg'
      />

      {registrationMutation.isSuccess && (
        <span className="register-form__success-message">Регистрация прошла успешно!</span>
      )}

      {registrationMutation.error && (
        <span>{registrationMutation.error.message}</span>
      )}
    </form>
  )
}

export default RegisterForm;