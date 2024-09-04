interface StrapiQuery {
  populate?: string | string[] | Record<string, any>;
  filters?: Record<string, any>;
  fields?: string | string[];
  sort?: string | string[];
  pagination?: {
    page: number;
    pageSize?: number;
  };
}

export default function strapiQueryToString(query?: StrapiQuery): string {
  if (!query) return "";
  const params = new URLSearchParams();

  function handleNestedObject(prefix: string, obj: any) {
    if (typeof obj === 'object' && !Array.isArray(obj)) {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object' && !Array.isArray(value)) {
          handleNestedObject(`${prefix}[${key}]`, value);
        } else {
          params.append(`${prefix}[${key}]`, value as any);
        }
      }
    } else {
      params.append(prefix, obj);
    }
  }

  if (query.populate) {
    if (typeof query.populate === 'string') {
      params.append('populate', query.populate);
    } else if (Array.isArray(query.populate)) {
      params.append('populate', query.populate.join(','));
    } else {
      handleNestedObject('populate', query.populate);
    }
  }

  if (query.filters) {
    for (const [key, value] of Object.entries(query.filters)) {
      handleNestedObject(`filters[${key}]`, value);
    }
  }

  if (query.fields) {
    if (typeof query.fields === 'string') {
      params.append('fields', query.fields);
    } else {
      params.append('fields', query.fields.join(','));
    }
  }

  if (query.sort) {
    if (typeof query.sort === 'string') {
      params.append('sort', query.sort);
    } else {
      params.append('sort', query.sort.join(','));
    }
  }

  if (query.pagination) {
    if (query.pagination.page) {
      params.append('pagination[page]', query.pagination.page.toString());
    }
    if (query.pagination.pageSize) {
      params.append('pagination[pageSize]', query.pagination.pageSize.toString());
    }
  }

  return "?" + params.toString();
}