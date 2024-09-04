export default interface MyReferredUsersInterface {
    count: number
    next: any
    previous: any
    results: Result[]
  }
  
  export interface Result {
    email: string
    date_joined: string
    is_verified: boolean
    referral_commission: number
  }