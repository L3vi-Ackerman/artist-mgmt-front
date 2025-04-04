
import Cookies from 'js-cookie'
import { UserData } from "@/shared/api/post/login-user";

export async function signupUser({email, password, role}:UserData) {
  console.log('Email: ',email)
  console.log("password", password)
  console.log("role", role)
  try {
    const response = await fetch('http://localhost:8000/signup/', {       
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed'); 
    }

    const data = await response.json();
    const token = data.token 
    Cookies.set('accessToken',token.accessToken,{expires:1})
    Cookies.set('refreshToken',token.refreshToken,{expires:1})
    return data;
  } catch (error) {
    throw error; 
  }
}
