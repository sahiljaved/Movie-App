export const isAuthenticated = () => {
    const token = localStorage.getItem('user'); 
    return token ? true : false;
  };