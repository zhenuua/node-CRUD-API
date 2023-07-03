import { IncomingMessage } from "http";

export const getUserIdFromUrl = (url: string | undefined) => url ? url.split("/")[3] : '';

export const getBaseUrl = (url: string | undefined) => url ? url.substring(0, url.lastIndexOf("/") + 1) : '';

export const getRequestBody = (req: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    let requestData = '';
    req.on('data', (chunk) => {
      requestData += chunk;
    });
    req.on('end', () => {
      resolve(requestData);
    });
    req.on('error', (error) => {
      reject(error);
    });
  });
};
