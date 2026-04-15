export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: StrapiPagination;
  };
}

export interface StrapiItem<T> {
  id: number;
  documentId: string;
  attributes: T;
}

export interface StrapiImageFormat {
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}

export interface StrapiImage {
  data: StrapiItem<StrapiImageFormat>;
}
