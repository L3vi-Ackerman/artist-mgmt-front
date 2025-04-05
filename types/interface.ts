export interface UserInterface {
  email: string;
  password: string;
  role: string;
  is_active:boolean;
  date_joined:string;
}
export interface ArtistInterface{
  id:number;
  user: UserInterface;
  name:string;
  dob:string;
  gender:string;
  address:string;
  first_release_year:string;
  no_of_albumns_released:number;
  created_at:string;
  updated_at:string;
}

export interface ProfileInterface {
  user: UserInterface;
  first_name?: string ;
  last_name?: string;
  phone?: number;
  dob?: string ;
  address?: string;
}

//export interface ArtistForm
