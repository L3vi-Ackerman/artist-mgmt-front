
import { toast } from "react-toastify";
import { UserData } from "./login-user"
import Cookies from "js-cookie"; 
interface ArtistData{
  id:number;
  first_name:string;
  last_name:string;
  dob:string;
  phone:number;
  address:string;
}

export async function updateArtist(artistData:ArtistData){
  const accessToken = Cookies.get('accessToken')
  console.log("This is inside update function,",artistData)


  try{
    const response = await fetch(`http://localhost:8000/artist/${artistData.id}/`,{
      method:'PUT',
      headers:{
        'Authorization':`Bearer ${accessToken}` ,
        'Content-Type':'application/json',
      },
      body:JSON.stringify(artistData)
    })
    if(!response.ok){
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }
    const createdArtist = await response.json()
    return createdArtist
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
