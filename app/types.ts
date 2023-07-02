export interface IUser {
  id: string,
  username: string,
  age: number,
  hobbies: string[],
}

export interface IUserPayload {
  username: string,
  age: number,
  hobbies: string[],
}