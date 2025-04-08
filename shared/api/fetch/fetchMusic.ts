
import Cookies from 'js-cookie'

const accessToken = Cookies.get('accessToken')


export async function fetchMusic() {
  const response = await fetch(`http://localhost:8000/music/`, 
  {

    method:'GET',
    headers:{
      //'Content-Type':'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const musicData = await response.json();
  console.log('music data: ', musicData)
  return musicData;
}
