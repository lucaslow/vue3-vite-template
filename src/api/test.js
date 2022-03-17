import { callApi } from "@/utils/http";

// 测试接口
export const testApi = () => {
  return callApi({
    url: "http://127.0.0.1:3001",
    method: "get",
  });
};
