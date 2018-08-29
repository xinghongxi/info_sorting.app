/* eslint-disable */
import axios from 'axios'
import loginService from '@/service/LoginService';
// 创建axios实例
const service = axios.create({
  baseURL: 'http://192.168.199.232:8060/baby',
  timeout: 5000
})
// request拦截器
service.interceptors.request.use( async (config) => {
  // Do something before request is sent
  let url = config.url;
  if (url.endsWith('/oauth/token')){
    return config;
  }
  let accessToken = await loginService.getAccessToken();
  if (accessToken){
    config.headers = { Authorization: `Bearer ${accessToken}`};
  }
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response;
    const status = res.status;
    if (status == 401){
      //store.dispatch('RemoveToken')
      console.log('认证失败！')
      location.reload();
    }
    return response
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  })
export default service
