import axios from 'axios';
import { message } from "ant-design-vue";
let {qs} = require('../util/moudel.js');

axios.defaults.timeout = 20000;
axios.defaults.baseURL = '';
axios.defaults.withCredentials = true;


// http request 拦截器
axios.interceptors.request.use(
  (config: object) => {
    return config;
  },
  (error: object) => {
    message.error({ message: '请求超时!' });
    return Promise.reject(error);
  },
);


// http response 拦截器
axios.interceptors.response.use(
  (response: any) => {
    return response.data;
  },
  (error: object) => Promise.reject(error),
);

/*
 * @param url
 * @param data
 * @return {Promise}
 * @description : GET请求
 * */
function GET(url: string, data = {}) {
  return new Promise((resolve:any, reject:any) => {
    axios.get(url+'?'+qs.stringify(data) )
      .then((response: object) => {
        resolve(response);
      })
      .catch((err: object) => {
        reject(err);
      });
  })
}/*
 * @param url
 * @param data
 * @return {Promise}
 * @description : POST请求
 * */
function POST(url: string, data = {}) {
  return new Promise((resolve:any, reject:any) => {

    axios.post(url, qs.stringify(data))
      .then((response: object) => {
        resolve(response);
      })
      .catch((err: object) => {
        reject(err);
      });
  })
}

export { GET , POST}
