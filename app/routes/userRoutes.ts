import { IncomingMessage, ServerResponse } from "http";
import { usersController } from "../controllers/usersController";

export const routes = [
  {
    method: 'GET',
    path: '/api/users',
    handler: (req: IncomingMessage, res: ServerResponse) => usersController.getUsers(req, res)
  },
  {
    method: 'GET',
    path: '/api/users/{userId}',
    handler: (req: IncomingMessage, res: ServerResponse) => usersController.getUserById(req, res)
  },
  {
    method: 'POST',
    path: '/api/users',
    handler: (req: IncomingMessage, res: ServerResponse) => usersController.createUser(req, res)
  },
  {
    method: 'PUT',
    path: '/api/users/{userId}',
    handler: (req: IncomingMessage, res: ServerResponse) => usersController.updateUserById(req, res)
  },
  {
    method: 'DELETE',
    path: '/api/users/{userId}',
    handler: (req: IncomingMessage, res: ServerResponse) => usersController.deleteUserById(req, res)
  },
]