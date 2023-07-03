import { IncomingMessage, ServerResponse } from "http";
import { IUserPayload } from "../types";
import { getRequestBody, getUserIdFromUrl } from "../utils/utils";
import { createUserData, deleteUserData, getUserData, getUsersData, updateUserData } from "../data/data";


export const usersController = {
  async getUsers(req: IncomingMessage, res: ServerResponse) {
    const users = await getUsersData()
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  },

  async getUserById(req: IncomingMessage, res: ServerResponse) {
    const id = getUserIdFromUrl(req.url)
    this.errHandlerUserId(id, res)

    const user = await getUserData(id);
    this.errHandlerUser(user, res)

    res.statusCode = 200;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  },

  async createUser(req: IncomingMessage, res: ServerResponse) {
    const body = await getRequestBody(req);
    const bodyData = JSON.parse(body) as IUserPayload
    this.errHandlerUserBody(bodyData, res)

    const newUser = await createUserData(bodyData)
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
  },

  async updateUserById(req: IncomingMessage, res: ServerResponse) {
    const id = getUserIdFromUrl(req.url)
    this.errHandlerUserId(id, res)

    const body = await getRequestBody(req);
    const bodyData = JSON.parse(body) as IUserPayload
    this.errHandlerUserBody(bodyData, res);

    const updatedUser = await updateUserData(id, bodyData);
    this.errHandlerUser(updatedUser, res)

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end();
  },

  async deleteUserById(req: IncomingMessage, res: ServerResponse) {
    const id = getUserIdFromUrl(req.url)
    this.errHandlerUserId(id, res)

    const deletedUser = await deleteUserData(id);
    this.errHandlerUser(deletedUser, res);

    res.writeHead(204, { "Content-Type": "application/json" });
    res.end();
  },

  errHandlerUser(user: any, res: ServerResponse) {
    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: 'User does not exist' }));
    }
  },

  errHandlerUserId(id: string, res: ServerResponse) {
    const uuidReg = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidReg.test(id)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: 'User Id is invalid (not uuid)' }));
    }
  },

  errHandlerUserBody(userBody: any, res: ServerResponse) {
    const isValidAge = userBody.age && typeof userBody.age === 'number';
    const isValidUsername = userBody.username && typeof userBody.username === 'string';
    const isValidHobbies = userBody.hobbies && Array.isArray(userBody.hobbies);
    if (!(isValidAge && isValidUsername && isValidHobbies && Object.keys(userBody).length === 3)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: 'Invalid user data' }));
    }
  }
}