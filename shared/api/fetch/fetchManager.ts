import Cookies from 'js-cookie'
const accessToken = Cookies.get('accessToken')
export async function fetchManager() {
  const response = await fetch(`http://localhost:8000/profile/one/`, 
 {
    method:'GET',
    headers:{
      //'Content-Type':'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const managerData = await response.json();
  return managerData;
}
