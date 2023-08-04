
import axios from 'axios'

const API_URL = '/api/users'

// get userList
export const getUserList = async()=>{
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    return response.data
}


 const userservice ={getUserList}
 export default userservice;