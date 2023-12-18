import { ApiSuccessResponse } from "_network/response";
import request from "../_network/request";

const tempBaseUrl = 'http://localhost:3002'

const readMessage = (ids: string[]): Promise<ApiSuccessResponse<void>> => {
  return request({
    baseURL: tempBaseUrl,
    url: `/branch/messages/open`,
    method: "PUT",
    data: { ids },
  });
};

export const MessageServices = {
  readMessage,
};
