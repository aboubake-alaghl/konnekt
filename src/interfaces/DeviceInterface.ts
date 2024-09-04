export default interface DeviceInterface {
  id: number
  name: string
  slug: string
  description: string
  image: string
  price: string
  capacity_min: number
  capacity_upto: number
  workload_capacity: string
  is_available: boolean
  is_highlight: boolean
  package_contents: string[]
  specifications: Specification[]
}
export interface Specification {
  id?: number
  created_at?: string
  last_update?: string
  name: string
  description: string
  device?: number
}
