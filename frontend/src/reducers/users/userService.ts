
import axios from 'axios'

const API_URL = 'http://localhost:5002/api/articles';

// get userList
export const getUser = async()=>{
    const response = await axios.get(API_URL + '/');
    return response.data
}


 const userService ={getUser}
 export default userService;