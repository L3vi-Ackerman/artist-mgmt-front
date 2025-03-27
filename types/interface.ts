export interface UserInterface {
  email: string;
  password: string;
  role: string;
}

export interface ProfileInterface {
  email: string;
  role: string;
  first_name?: string | null;
  last_name?: string | null;
  phone?: number | null;
  dob?: string | null;
  address?: string | null;
}
