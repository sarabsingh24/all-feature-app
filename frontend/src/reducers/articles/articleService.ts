import axios from 'axios';

const API_URL = 'http://localhost:5002/api/articles';

// get articles
export const getArticles = async () => {
  const response = await axios.get(API_URL + '/');
  return response.data;
};

const articleService = { getArticles };
export default articleService;
