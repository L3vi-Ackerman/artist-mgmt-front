import { warn } from 'console';
import { access } from 'fs';
import Cookies from 'js-cookie'


const accessToken = Cookies.get('accessToken')
const refreshToken = Cookies.get('refreshToken')


export async function fetchUser(endPoint: string) {
  const response = await fetch(`http://localhost:8000/${endPoint}/`, 
  {

    method:'GET',
    headers:{
      //'Content-Type':'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const userData = await response.json();
  return userData;
}
