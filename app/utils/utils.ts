import { IUser, IUserPayload } from "../types";
import fs from "fs";
import { IncomingMessage, ServerResponse } from "http";
import path from "path";

export const saveData = (data: IUser[]) => {
  try {
    fs.writeFileSync(
      path.join(__dirname, "..", "data", "users.json"),
      JSON.stringify(data),
      "utf-8"
    );
  } catch (err) {
    console.log(err);
  }
};

export const validateJSON = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

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
