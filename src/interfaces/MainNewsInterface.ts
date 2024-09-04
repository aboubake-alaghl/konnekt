export default interface MainNewsInterface {
    data: Data
    meta: Meta
}

export interface Data {
    id: number
    attributes: Attributes
}

export interface Attributes {
    createdAt: string
    updatedAt: string
    publishedAt: string
    news: News
}

export interface News {
    data: Data2
}

export interface Data2 {
    id: number
    attributes: Attributes2
}

export interface Attributes2 {
    title: string
    content: string
    is_active: boolean
    published_date: string
    excerpt: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    cover: Cover
}

export interface Cover {
    data: Data3
}

export interface Data3 {
    id: number
    attributes: Attributes3
}

export interface Attributes3 {
    name: string
    alternativeText: any
    caption: any
    width: number
    height: number
    formats: Formats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: any
    provider: string
    provider_metadata: ProviderMetadata5
    createdAt: string
    updatedAt: string
}

export interface Formats {
    large: Large
    thumbnail: Thumbnail
    small: Small
    medium: Medium
}

export interface Large {
    name: string
    hash: string
    ext: string
    mime: string
    path: any
    width: number
    height: number
    size: number
    sizeInBytes: number
    url: string
    provider_metadata: ProviderMetadata
}

export interface ProviderMetadata {
    public_id: string
    resource_type: string
}

export interface Thumbnail {
    name: string
    hash: string
    ext: string
    mime: string
    path: any
    width: number
    height: number
    size: number
    sizeInBytes: number
    url: string
    provider_metadata: ProviderMetadata2
}

export interface ProviderMetadata2 {
    public_id: string
    resource_type: string
}

export interface Small {
    name: string
    hash: string
    ext: string
    mime: string
    path: any
    width: number
    height: number
    size: number
    sizeInBytes: number
    url: string
    provider_metadata: ProviderMetadata3
}

export interface ProviderMetadata3 {
    public_id: string
    resource_type: string
}

export interface Medium {
    name: string
    hash: string
    ext: string
    mime: string
    path: any
    width: number
    height: number
    size: number
    sizeInBytes: number
    url: string
    provider_metadata: ProviderMetadata4
}

export interface ProviderMetadata4 {
    public_id: string
    resource_type: string
}

export interface ProviderMetadata5 {
    public_id: string
    resource_type: string
}

export interface Meta { }
