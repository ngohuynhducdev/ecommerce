export interface User {
  id: number;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}
