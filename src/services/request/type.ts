import { AxiosRequestConfig, AxiosResponse } from "axios"
// 自定义拦截器请求扩展
export interface FDRequestIntercepters<T = AxiosResponse> {
  requestIntercepter?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestIntercepterCatch?: (config: any) => any
  responseIntercepter?: (config: T) => T
  responseIntercepterCatch?: (config: any) => any
}
// 对原来的AxiosRequestConfig类型进行扩展
export interface FDRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  intercepters?: FDRequestIntercepters<T>
  showLoading?: boolean
}
