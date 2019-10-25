export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const tokenExpiration = localStorage.getItem('tokenExpiration');

  if (!token || !tokenExpiration) return false;

  const tokenExpired = tokenExpiration - Date.now() <= 0;

  if (tokenExpired) return false;

  return true;
};
