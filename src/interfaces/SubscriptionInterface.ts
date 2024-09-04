export default interface SubscriptionInterface {
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
