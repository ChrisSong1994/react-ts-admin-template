import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { message } from 'antd';

// 设置默认值
axios.defaults = Object.assign(axios.defaults, {
    baseURL: '/blog',
    timeout: 5000, // 5秒超时
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        token: localStorage.getItem('token') || '',
    },
});

// 请求拦截  （后面应该添加重复请求拦截）
axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (err: AxiosError) => {
        // 请求的错误判断,根据不同的错误码不同消息提醒
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = '错误请求';
                    break;
                case 500:
                    err.message = '服务器端出错';
                    break;
                default:
                    err.message = `连接错误${err.response.status}`;
            }
        } else {
            err.message = '连接服务器失败';
        }
        message.error(err.message);
        return Promise.resolve(err.response);
    }
);

// 请求封装
const request = {
    get(url: string, params: any) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: url,
                params: params, // 序列化
            })
                .then((res) => {
                    resolve(res);
                })
                .then((err) => {
                    reject(err);
                });
        });
    },
    post(url: string, params: any) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: url,
                data: JSON.stringify(params), //post data需要系列化
            })
                .then((res) => {
                    resolve(res);
                })
                .then((err) => {
                    reject(err);
                });
        });
    },
};

export default request;
