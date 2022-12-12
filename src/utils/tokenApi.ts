export const setTokenToLocalStorage = (token: string) => {
  localStorage.setItem('token', token);
};

const isTokenExpired = (token: string): boolean => {
  const data = atob(token.split('.')[1]);
  const expiredTimeInSeconds = JSON.parse(data).exp;
  return Boolean(Date.now() > expiredTimeInSeconds * 1000);
};

export const isTokenValid = (): boolean => {
  const token = localStorage.getItem('token');

  return token ? Boolean(!isTokenExpired(token)) : false;
};

export const removeTokenFromLocalStorage = () => localStorage.removeItem('token');
