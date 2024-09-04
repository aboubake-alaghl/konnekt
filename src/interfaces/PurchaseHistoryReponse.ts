export default interface PurchaseHistoryReponse {
    count: number
    next: any
    previous: any
    results: Result[]
}

export interface Result {
    id: number
    verb: string
    description: string
    action_object: string
    content_obj: string
    obj_id: number
    timestamp: string
    unread: boolean
}
