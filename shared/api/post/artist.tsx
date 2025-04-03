import { UserData } from "./login-user"
interface ArtistData{
  user:UserData;
  name:string;
  dob:string;
  gender:string;
  address:string;
  first_release_year:string;
  no_of_albumns_released:number;
}
export async function createArtist(artistData:ArtistData){
  try{
    const response = await fetch('http://localhost:8000/artist/',{
      method:'POST',
      headers:{
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
