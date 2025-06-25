export interface BaseResponseAPI<T> {
  code: number
  message: string
  data: T
}
