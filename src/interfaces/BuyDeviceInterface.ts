interface BuyDeviceInterface {
    device_ids: number[],
    shipping_address: {
        country: string,
        state?: string,
        city: string,
        postal_code: string,
        address_line1: string,
        address_line2?: string,
        recipient_name: string,
        recipient_phone: string
    },
    promo_code?: string
}