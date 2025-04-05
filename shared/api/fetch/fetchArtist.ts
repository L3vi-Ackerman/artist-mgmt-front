import Cookies from 'js-cookie'


const accessToken = Cookies.get('accessToken')
const refreshToken = Cookies.get('refreshToken')


export async function fetchArtist() {
  const response = await fetch(`http://localhost:8000/artist/one/`, 
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
