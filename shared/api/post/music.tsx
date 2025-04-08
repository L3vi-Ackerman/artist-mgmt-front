
import { toast } from "react-toastify";
import { UserData } from "./login-user"
import Cookies from "js-cookie"; 
interface MusicData{
  id:number;
  title:string;
  genre:string;
  album_name:string;
}

export async function updateMusic(musicData:MusicData){
  const accessToken = Cookies.get('accessToken')
  console.log("This is inside update function,",musicData)


  try{
    const response = await fetch(`http://localhost:8000/music/${musicData.id}/`,{
      method:'PUT',
      headers:{
        'Authorization':`Bearer ${accessToken}` ,
        'Content-Type':'application/json',
      },
      body:JSON.stringify(musicData)
    })
    if(!response.ok){
      const errorData = await response.json()
      return {success:false, message:errorData}
      
    }
    const createdMusic= await response.json()
    return {success:true, message:createdMusic} 
  }catch(error){
    console.log('Error creating artist', error)
    throw error;
  }
}


export async function deleteArtist(artistId:number){
  const accessToken = Cookies.get('accessToken')
  console.log("This is inside update function,",artistId)


  try{
    const response = await fetch(`http://localhost:8000/artist/${artistId}/`,{
      method:'DELETE',
      headers:{
        'Authorization':`Bearer ${accessToken}` ,
        'Content-Type':'application/json',
      },
    })
    if(!response.ok){
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }
    toast.success("Artist Deletion Successful")
  
  }catch(error){
    console.log('Error creating artist', error)
    throw error;
  }
}
