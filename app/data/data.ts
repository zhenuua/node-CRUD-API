import { IUser, IUserPayload } from "../types";
import { randomUUID } from "node:crypto";

interface IStore {
  users: IUser[]
}

const store: IStore = {
  users: [
    {
      id: '6c72ede2-8d08-44fd-ae75-f07f8fc9b3cc',
      username: 'user1',
      age: 1,
      hobbies: ['hobby-1', 'hobby-2'],
    }
  ]
};

export const getUsersData = async () => await new Promise((resolve) => resolve(store.users));

export const getUserData = async (id: string) =>
  await new Promise((resolve, reject) => {
    const user = store.users.find((user) => user.id === id);
    user ? resolve(user) : reject()
  }).catch((err) => { });

export const createUserData = async (data: IUserPayload) => await new Promise((resolve) => {
  const newUser = {
    id: randomUUID(),
    ...data,
  };
  store.users.push(newUser);
  resolve(newUser);
});
