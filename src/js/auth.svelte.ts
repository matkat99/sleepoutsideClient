import { getLocalStorage, setLocalStorage, getJSONData } from "./utils.mts";
const baseURL = import.meta.env.VITE_SERVER_URL;

interface UserStore {
  isLoggedIn:boolean,
  user?:{
      name:string
      email:string
      _id:string
  },
  token:string
}
export const userStore = $state( {isLoggedIn: false, user: {}, token: ""}) as UserStore;

export async function login(email:string, password:string) {
  // const res = await fetch(`${baseURL}users/login`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email, password }),
  // })
  const {error, data} = await getJSONData("users/login", "POST", new Headers({ "Content-Type": "application/json" }), { email, password })
  console.log(data)
  if (data) {
    setLocalStorage('so-user', data);
    userStore.user = data.user;
    userStore.token = data.token;
    userStore.isLoggedIn = true;
  }
  else if (error) {
    console.log(error)
    throw new Error(error);
  }
  
}

export function logout() {
  setLocalStorage('so-user', null);
  userStore.user = undefined;
  userStore.token = "";
  userStore.isLoggedIn = false;
  setLocalStorage('so-user', null);
  // we should probably do something if they are on a protected page when they logout...
}

export function checkAuth() {
  // really we are just initilizing our store with data from local storage. We aren't really checking to see if the token is still valid. That will happen the next time we try to use it.
  // if we use it and get an error from the server, we should logout and clear our local storage. 
    const userData = getLocalStorage("so-user");
    // console.log(userData)
    if(userData) {
      userStore.user = userData.user
      userStore.token = userData.token;
      userStore.isLoggedIn = true;
    } else {
      userStore.isLoggedIn = false;
      userStore.user = undefined;
      userStore.token = "";
    }
    // the double bang !! turns a variable into a boolean this will return a true or false.
    return !!userData;
}
