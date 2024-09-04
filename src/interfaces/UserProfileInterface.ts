export default interface UserProfileInterface {
  first_name: string
  last_name: string
  email: string
  is_verified?: boolean
  referral_code?: string
  commission_from_referral?: number
  commission_from_referral_withdrawn?: number
  has_stripe_card_id?: boolean
  profile?: Profile
}

export interface Profile {
  photo: any
  address: any
  city: any
  country: any
  zipcode: any
  citizenship: any
  phone: any
  phone_verified: boolean
}
