import { toast } from "react-toastify";
import Cookies from "js-cookie"; 
interface UserData{
  id:number;
  email:string;
  role:string;
  status:boolean;
}

export async function updateUser(userData:UserData){
  const accessToken = Cookies.get('accessToken')
  console.log("This is inside update function,",userData)


  try{
    const response = await fetch(`http://localhost:8000/user/${userData.id}/`,{
      method:'PUT',
      headers:{
        'Authorization':`Bearer ${accessToken}` ,
        'Content-Type':'application/json',
      },
      body:JSON.stringify(userData)
    })
    if(!response.ok){
      const errorData = await response.json()
      return {success:false, message: errorData}  
    }
    const updatedUser = await response.json()
    return {success:true, message:updatedUser} 
  }catch(error){
    console.log('Error updating user', error)
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
