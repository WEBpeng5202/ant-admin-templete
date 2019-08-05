import axios from 'axios';
import { message } from "ant-design-vue";
let { qs } = require('../util/moudel.js');
axios.defaults.timeout = 20000;
axios.defaults.baseURL = '';
axios.defaults.withCredentials = true;
// http request 拦截器
axios.interceptors.request.use((config) => {
    return config;
}, (error) => {
    message.error({ message: '请求超时!' });
    return Promise.reject(error);
});
// http response 拦截器
axios.interceptors.response.use((response) => {
    return response.data;
}, (error) => Promise.reject(error));
/*
 * @param url
 * @param data
 * @return {Promise}
 * @description : GET请求
 * */
function GET(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url + '?' + qs.stringify(data))
            .then((response) => {
            resolve(response);
        })
            .catch((err) => {
            reject(err);
        });
    });
} /*
 * @param url
 * @param data
 * @return {Promise}
 * @description : POST请求
 * */
function POST(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(data))
            .then((response) => {
            resolve(response);
        })
            .catch((err) => {
            reject(err);
        });
    });
}
export { GET, POST };
//# sourceMappingURL=axios.js.map