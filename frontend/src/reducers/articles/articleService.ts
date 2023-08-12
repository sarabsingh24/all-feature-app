import axios from 'axios';

const API_URL = 'http://localhost:5002/api/articles';

// GET articles
export const getArticles = async () => {
  const response = await axios.get(API_URL + '/');
  return response.data;
};

// POST articles
export const setArticles = async (data:{}) => {
  const response = await axios.post(API_URL + '/',data);
  return response.data;
};
// UPDATE articles
export const updateArticles = async (data:  {id:string, obj:{}}) => {
  const response = await axios.put(API_URL + `/${data.id}`, data.obj);
  return response.data;
};

// DELETE articles
export const deleteArticles = async (data:string) => {
  const response = await axios.delete(API_URL + `/${data}`);
  return response.data;
};

const articleService = { getArticles, setArticles,updateArticles, deleteArticles };
export default articleService;
