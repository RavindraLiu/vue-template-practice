// 对axios进行封装 类更具有更强的封装性
import axios from "axios"
// 导入axios的包其实就是axios的实例

import type { AxiosInstance } from "axios"
import { FDRequestConfig, FDRequestIntercepters } from "./type"

import { ElLoading } from "element-plus"
import type { LoadingInstance } from "element-plus/lib/components/loading/src/loading"
//Axios
const DEFAULT_TYPE = false
class FDRequest {
  instance: AxiosInstance
  interceptors?: FDRequestIntercepters
  loading?: LoadingInstance
  showLoading = DEFAULT_TYPE // 默认初始化值
  constructor(config: FDRequestConfig) {
    // 针对不同的url 通过传递配置创建不同的实例对象
    this.instance = axios.create(config)
    this.interceptors = config?.intercepters

    // debugger
    // 在config中取出的拦截器是实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestIntercepter,
      this.interceptors?.requestIntercepterCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseIntercepter,
      this.interceptors?.responseIntercepterCatch
    )
    // 2. 所有实例扩展的公共拦截器
    this.instance.interceptors.request.use(
      (config: FDRequestConfig) => {
        console.log("公共实例请求拦截器 config")
        // 需要显示的时候才显示loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在加载中...",
            background: "rgba(0,0,0,0.5)"
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log("公共实例响应拦截器 config")
        // returnCode 的不同状态返回不同的数据
        this.loading?.close()
        const data = res.data
        if (data.returnCode === "1001") {
          console.log("打印错误信息")
        }
        return data
      },
      (err) => {
        // switch 根据不同的错误码显示不同的错误信息
        this.loading?.close()
        if (err.response.status === "404") {
          console.log("打印错误信息")
        }
        return err
      }
    )
  }

  // 拦截器的定义 1.携带token 2. 添加loading动画
  // 每个请求的拦截可能是不一样的，所以设置的时候自定义公共拦截器

  request<T>(config: FDRequestConfig<T>): Promise<T> {
    // 设置单个请求默认为显示loading效果
    return new Promise((resolve, reject) => {
      this.showLoading = config.showLoading ?? true
      if (config.intercepters?.requestIntercepter) {
        config = config.intercepters.requestIntercepter(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.intercepters?.responseIntercepter) {
            res = config.intercepters.responseIntercepter(res)
          }
          // 返回的数据类型不是为DataType类型
          this.showLoading = DEFAULT_TYPE
          return resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_TYPE
          return reject(err)
        })
    })
  }
  get<T>(config: FDRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" })
  }
  post<T>(config: FDRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" })
  }
  delete<T>(config: FDRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" })
  }
  put<T>(config: FDRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PUT" })
  }
}

export default FDRequest
