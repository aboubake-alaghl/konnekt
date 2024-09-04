export default interface UserInterface {
    access: string
    refresh: string
    user: User
  }
  
  export interface User {
    email: string
    first_name: string
    last_name: string
  }