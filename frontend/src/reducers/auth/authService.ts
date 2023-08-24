import axios from 'axios';

const API_URL = 'http://localhost:5002/api/auth';

const register = async (userData: {}) => {
  const response = await axios.post(API_URL + '/register', userData);
  return response.data;
};

const login = async (userData: {}) => {
  const response = await axios.post(API_URL + '/login', userData);
  return response.data;
};


const uploadImage = async (imgData: FormData) => {
  const response = await axios(API_URL + '/userImg', {
    method:'POST',
    data: imgData,
  });
  return response.data;
};


export const updateUserFun = async (
  data: { id: string; obj: {} },
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + `/${data.id}`, data.obj, config);
  return response.data;
};

const authService = { register, login, uploadImage, updateUserFun };
export default authService;
