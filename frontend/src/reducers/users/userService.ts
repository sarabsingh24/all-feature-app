import axios from 'axios';

const API_URL = 'http://localhost:5002/api/users';

// get userList
// export const loginedUserInfo = async (data: {}) => {
//   const response = await axios.get(API_URL + '/me');
// console.log(response.data)
//   return response.data;
// };

export const getUserData = async (id:string,token: string) => {
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `/${id}`, config);
  return response.data;
};



const userService = { getUserData };
export default userService;
