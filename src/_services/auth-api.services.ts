import { ApiSuccessResponse } from "_network/response";
import {
  LoginReqI,
  LoginResI,
} from "../_interfaces/auth-api.interfaces";
import request from "../_network/request";

const tempBaseUrl = 'http://localhost:3001'

const login = (payload: LoginReqI): Promise<ApiSuccessResponse<LoginResI>> => {
  return request({
    baseURL: tempBaseUrl,
    url: `/branch/login`,
    method: "POST",
    data: payload,
  });
};

export const AuthServices = {
  login,
};
