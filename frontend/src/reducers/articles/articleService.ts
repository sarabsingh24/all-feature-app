import axios from 'axios';

const API_URL = 'http://localhost:5002/api/articles';

// GET articles
export const getArticles = async (token:string) => {
   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   };
  const response = await axios.get(API_URL + '/', config);
  return response.data;
};

// POST articles
export const setArticles = async (data:{},token:string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + '/',data,config);

  return response.data;
};
// UPDATE articles
export const updateArticles = async (data: { id: string; obj: {} }, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + `/${data.id}/`, data.obj, config);
  return response.data;
};
// LIKES articles
export const likesArticles = async (data: { id: string; obj: {} }, token: string) => {
 
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + `/${data.id}/likes`,
    data.obj,
    config
  );

  
  return response.data;
};

// DELETE articles
export const deleteArticles = async (data: string, token:string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + `/${data}`, config);
  return response.data;
};

const articleService = {
  getArticles,
  setArticles,
  updateArticles,
  likesArticles,
  deleteArticles,
};
export default articleService;
