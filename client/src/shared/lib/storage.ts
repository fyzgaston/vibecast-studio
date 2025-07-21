const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';
const FAVORITES_KEY = 'favorites';
const ID_KEY = 'currentTrackId';

// работа с токеном
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

// работа с юзером
export const setUsername = (username: string) => localStorage.setItem(USERNAME_KEY, username);
export const removeUsername = () => localStorage.removeItem(USERNAME_KEY);
export const clearUserData = () => {
  removeToken();
  removeUsername();
};

// работа с избранным
export const getFavorites = (): number[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}
export const setFavorites = (favorites: number[]) =>  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));

// работа с айди
export const setCurrentId = (id: string) =>  localStorage.setItem(ID_KEY, String(id));
export const getCurrentId = () => localStorage.getItem(ID_KEY);