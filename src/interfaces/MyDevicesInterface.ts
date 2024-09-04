export default interface MyDevicesInterface {
    id: number
    device: Device
    verification_code: string
    miner_status: boolean
    is_online: boolean
}

export interface Device {
    id: number
    name: string
    slug: string
    description: string
    image: string
    price: string
    capacity_min: number
    capacity_upto: number
    workload_capacity: number
    is_available: boolean
    is_highlight: boolean
    package_contents: string[]
    specifications: Specification[]
}

export interface Specification {
    id: number
    created_at: string
    last_update: string
    name: string
    description: string
    device: number
}
