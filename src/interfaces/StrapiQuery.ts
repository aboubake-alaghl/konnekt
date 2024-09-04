export default interface StrapiQuery {
    populate?: string | string[] | Record<string, any>;
    filters?: Record<string, any>;
    fields?: string | string[];
    sort?: string | string[];
    pagination?: {
      page: number;
      pageSize?: number;
    };
  }