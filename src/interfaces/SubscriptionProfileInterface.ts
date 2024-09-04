export default interface SubscriptionProfileInterface {
    id: number
    subscription_plan: SubscriptionPlan
    periode_end: string
    stripe_sub_id: string
    status: string
  }
  
  export interface SubscriptionPlan {
    id: number
    name: string
    description: string
    price: string
    price_yearly: string
    features: Feature[]
    device_limit: number
    capacity: number
  }
  
  export interface Feature {
    name: string
  }
  