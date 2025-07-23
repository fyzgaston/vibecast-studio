import {API_URL} from '@/entities/api/config.ts';

type User = {
  username: string;
}

export type RegisterResponse = {
  message: string;
  user: User;
}

export type LoginResponse = {
  message: string;
  token: string;
}

// регистрация юзера
export const registerUser = async (username: string, password: string): Promise<RegisterResponse> => {
  const response = await fetch(`${API_URL}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password}),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('Сервер вернул некорректный ответ');
  }

  if (!response.ok) {
    if (response.status === 400 && data.message === 'пользователь уже существует') {
      throw new Error('Пользователь с таким именем уже существует');
    }

    throw new Error(data.message || 'Ошибка при регистрации');
  }

  return data;
}

// авторизация юзера
export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password}),
  })

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('Сервер вернул некорректный ответ');
  }

  if (!response.ok) {
    if (response.status === 400 && data.message === 'произошла ошибка при авторизации - неверные данные') {
      throw new Error('Пользователя с таким именем не существует');
    }

    throw new Error(data.message || 'Ошибка авторизации');
  }

  return data;
}