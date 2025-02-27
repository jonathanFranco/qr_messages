class QueryParams {
  constructor(
    public page?: number,
    public size?: number,
    public name?: string
  ) {}
}

class Pagination<T> {
  constructor(
    public content: T[] = [],
    public total: number = 0,
    public currentPage: number = 0,
    public size: number = 0
  ) {}
}

export { Pagination, QueryParams };
