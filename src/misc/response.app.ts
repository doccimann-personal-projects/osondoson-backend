export interface AppResponse<T> {
  data: T | null;
  errorMessage: string | null
}
