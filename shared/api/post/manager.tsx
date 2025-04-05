
import { toast } from "react-toastify";
import { UserData } from "./login-user"
import Cookies from "js-cookie"; 
interface ManagerData{
  id:number;
  first_name:string;
  last_name:string;
  dob:string;
  phone:string;
  address:string;
}

export async function updateManager(managerData:ManagerData){
  const accessToken = Cookies.get('accessToken')

  console.log(`URL: http://localhost:8000/profile/${managerData.id}` )
  console.log("This is inside update function,",managerData)


  try{
    const response = await fetch(`http://localhost:8000/profile/${managerData.id}`,{
      method:'PUT',
      headers:{
        'Authorization':`Bearer ${accessToken}` ,
        'Content-Type':'application/json',
      },
      body:JSON.stringify(managerData)
    })
    if(!response.ok){
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }
    const updatedManager = await response.json()
    return updatedManager 
  }catch(error){
    console.log('Error creating manager', error)
    throw error;
  }
}


export async function deleteManager(managerId:number){
  const accessToken = Cookies.get('accessToken')
  console.log("This is inside update function,",managerId)


  try{
    const response = await fetch(`http://localhost:8000/profile/${managerId}/`,{
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
    toast.success("Manager Deletion Successful")
  
  }catch(error){
    console.log('Error creating manager', error)
    throw error;
  }
}
