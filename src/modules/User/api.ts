import { User } from "./User";
import {
  createUserWithEmailAndPassword,
  getAuth,
  UserCredential,
  User as fbUser,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

interface IApi {
  registerUser: (user: User) => Promise<fbUser>;
  addUser: (user: User) => Promise<void>;
  loginUser: (user: User) => Promise<fbUser>;
  getUser: (userId: string) => Promise<User>;
  signOutUser: () => Promise<void>;
}

const dataBaseUrl: string = process.env.VUE_APP_FIREBASE_DATABASE_URL;

const registerUser = (user: User): Promise<fbUser> =>
  createUserWithEmailAndPassword(getAuth(), user.email, user.password)
    .then((data: UserCredential) => {
      return data.user;
    })
    .catch((error) => {
      return error;
    });

const loginUser = (user: User): Promise<fbUser> =>
  signInWithEmailAndPassword(getAuth(), user.email, user.password)
    .then((data: UserCredential) => {
      return data.user;
    })
    .catch((error) => {
      return error;
    });

const addUser = async (user: User): Promise<void> => {
  await fetch(`${dataBaseUrl}/users.json`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((response) => console.log("response: ", response))
    .catch((error) => error);
};

const getUser = (userId: string): Promise<User> =>
  fetch(`${dataBaseUrl}/users.json?orderBy="uid"&equalTo="${userId}"`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      console.log("user: ", response);
      return response;
    })
    .catch((error) => error);

const signOutUser = (): Promise<void> =>
  signOut(getAuth())
    .then((resp) => {
      console.log("resp: ", resp);
    })
    .catch((error) => error);

export const api: IApi = {
  registerUser,
  addUser,
  loginUser,
  getUser,
  signOutUser,
};

export default api;
