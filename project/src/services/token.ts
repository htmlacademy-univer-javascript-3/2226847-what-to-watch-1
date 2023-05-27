const AUTH_TOKEN_KEY_NAME = 'wtw-token';

export type TokenType = string;

export const getToken = (): TokenType => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const setToken = (token: TokenType): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
