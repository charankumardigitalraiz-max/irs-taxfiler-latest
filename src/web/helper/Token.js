export const gettoken = () => {
    const usertoken = localStorage.getItem('authToken');

    if(usertoken)
    {
        return true;
    }

    return false;
}
export const getuser = () => {
  const usertoken = localStorage.getItem('user');
  return usertoken ? JSON.parse(usertoken) : null;
};