import poly from "webextension-polyfill";

import type {
  GetRegisteredUrlsMessage,
  GetRegisteredUrlsResponseMessage,
  RegisterUrlMessage,
  UnregisterUrlMessage,
} from "../messageTypes";
import ApplicationError from "../ApplicationError";

const getRegisteredUrls =
  async (): Promise<GetRegisteredUrlsResponseMessage> => {
    const message: GetRegisteredUrlsMessage = {
      type: "get-registered-urls",
    };
    return poly.runtime.sendMessage(message);
  };

const registerUrl = async (url: string): Promise<void> => {
  const result = await poly.permissions.request({
    origins: [url],
  });
  if (!result) {
    throw ApplicationError.userDeniedAuthorization();
  }
  const message: RegisterUrlMessage = { type: "register-url", url };
  return poly.runtime.sendMessage(message);
};

const unregisterUrl = async (url: string): Promise<void> => {
  const message: UnregisterUrlMessage = {
    type: "unregister-url",
    url,
  };
  return poly.runtime.sendMessage(message);
};

export { getRegisteredUrls, registerUrl, unregisterUrl };
