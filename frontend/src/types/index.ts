export interface Credentials {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
}

export interface User {
  id: number
  email: string
  createdAt: string
}
