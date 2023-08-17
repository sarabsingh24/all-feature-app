
import axios from 'axios'

const API_URL = 'http://localhost:5002/api/users';

// get userList
export const loginedUserInfo = async(data:{})=>{
    const response = await axios.get(API_URL + '/me');
    return response.data
}


 const userService = { loginedUserInfo };
 export default userService;