import Cookies from 'js-cookie'
export interface UserData{
  email:string;
  password:string;
  role?:string;
}

interface LoginResult{
  success:boolean;
  token?:string;
  error?:string;
}
export async function login({email,password,role}:UserData):Promise<LoginResult>{
  const url = 'http://localhost:8000/login/'
  const data = {email,password}

  try {
   const response = await fetch(url, {
     method: 'POST',
     headers:{
       'Content-Type': 'application/json',
     },
     body:JSON.stringify(data)
   });
   if(!response.ok){
     const errortext = await response.text()
     return {success:false,error:`Login Failed: ${response.status} - ${errortext}`}
   }

   const jsonResponse = await response.json()
   if(jsonResponse && jsonResponse.token){
     const token = jsonResponse.token
     Cookies.set('accessToken', token.accessToken,{expires:1})
     Cookies.set('refreshToken',token.refreshToken, {expires:1})

   }else{
     return {success:false, error:'Tokne not found in response'}
   }
  } catch (error) {
   return {success:false,error:`Login failed: ${error}`} 
  }
  return {success:true,error:"Function returned"}

}
