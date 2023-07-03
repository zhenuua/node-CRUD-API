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

export const updateUserData = async (id: string, data: IUserPayload) => {
  return await new Promise((resolve, reject) => {
    const userIndex = store.users.findIndex((user => user.id === id));
    if (userIndex === -1) reject()
    const updatedUser = store.users.splice(userIndex, 1, {
      id: id,
      ...data
    })
    resolve(updatedUser)
  }).catch((err) => { });
};

export const deleteUserData = async (id: string) => {
  return await new Promise((resolve, reject) => {
    const userIndex = store.users.findIndex((user => user.id === id));
    if (userIndex === -1) reject()
    const deletedUser = store.users.splice(userIndex, 1)
    resolve(deletedUser)
  }).catch((err) => { });
};
