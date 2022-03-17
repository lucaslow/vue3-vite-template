import axios from "axios";
import messageOnce from "./messageOnce";
import qs from "qs";
// post 的内容类型
const contentTypes = {
  json: "application/json; charset=utf-8",
  urlencoded: "application/x-www-form-urlencoded; charset=utf-8",
  multipart: "multipart/form-data",
};

// 默认配置
const defaultOptions = {
  withCredentials: true, // 允许把cookie传递到后台
  headers: {
    Accept: "application/json",
    "Content-Type": contentTypes.json,
  },
  timeout: 15000,
};

// 请求拦截器吧
axios.interceptors.request.use(
  (config) => {
    /* 一般配置登录的token */
    // let token = store.getters['login/token'];
    // token && (config.headers.token = token)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器吧
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const response = Object.assign({}, error.response);
    if (response) {
      switch (response.status) {
        case 401:
          // todo
          break;
        case 403:
          // todo
          break;
        default:
          // todo
          if (response.status) {
            messageOnce.error({
              message: response.data.message,
            });
          } else {
            // 服务器超时未响应时，response.status为undefined
            messageOnce.error("服务器异常，请稍后再试", {
              duration: 3000,
            });
          }

          break;
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

/**
 * 封装axios，支持用户自定义配置请求初始化配置，设置不同的请求前缀
 * @param {String} url 请求地址
 * @param {String} method 请求方法
 * @param {Object} data 请求参数
 * @param {String} contentType post 请求内容类型
 * @param {String} prefix 请求前缀，支持多个
 */
export const callApi = ({
  url,
  method,
  data,
  options = {},
  contentType = "json",
  prefix = "/api",
}) => {
  if (!url) {
    return Promise.reject(new Error("传入的url不能为空！"));
  }

  const fullUrl = prefix ? `${prefix}/${url}` : url;

  // 处理创建axios实例的配置项
  const newOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      "Content-Type":
        options.headers && options.headers["Content-Type"]
          ? options.headers["Content-Type"]
          : contentTypes[contentType],
    },
    method,
  };

  // 处理data
  if (method === "get") {
    newOptions.params = data;
  }

  if (method !== "get" && method !== "head") {
    newOptions.data = data;
    if (data instanceof FormData) {
      newOptions.headers = {
        "x-requested-with": "XMLHttpRequest",
        "cache-control": "no-cache",
      };
    } else if (newOptions.headers["Content-Type"] === contentTypes.urlencoded) {
      newOptions.data = qs.stringify(data);
    } else {
      // 删除空字符/null/undefined的传参
      Object.keys(data).forEach((item) => {
        if (
          data[item] === null ||
          data[item] === undefined ||
          data[item] === ""
        ) {
          delete data[item];
        }
      });
    }
  }
  return axios({
    url: fullUrl,
    ...newOptions,
  });
};
