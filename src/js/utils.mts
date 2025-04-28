// wrapper for querySelector...returns matching element
export function qs(selector:string, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key:string) {
  const data = localStorage.getItem(key);
  if(!data) return null;
  return JSON.parse(data);
}
// save data to local storage
export function setLocalStorage(key:string, data:any) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
interface ClickHandler {
  (e:Event):void;
}

export function setClick(selector:string, callback:ClickHandler) {
  const element = qs(selector);
  element?.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback(event);
  });
  element?.addEventListener("click", callback);
}

export function openUserMenu(selector:string) {
  setClick(selector, (e:Event) => {
    e.stopPropagation();
    const el = document.querySelector(".user__menu");
    el?.classList.toggle("open");
  });
  setClick("body", () => {
    const openMenus = document.querySelectorAll(".open");
    openMenus.forEach((el) => {
      el?.classList.remove("open");
    });
  });
}

export function getParam(param:string){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function formDataToJSON(formElement: HTMLFormElement) {
  const formData = new FormData(formElement),
    convertedJSON:any = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

// Function will return an object {error: string | null, data: any}
export async function getJSONData(url:string, method:string = "GET", headers:Headers = new Headers(), body?:any) {
  const baseURL = import.meta.env.VITE_SERVER_URL;
  // set both data and error to null initially. One of them will be set and the other should stay null.
  let error:string|null = null;
  let data = null;
  const res = await fetch(`${baseURL}${url}`, {
    method,
    headers,
    body: body? JSON.stringify(body): null,
  })

  if (!res.ok) { //something went wrong
    try {
      // Attempt to parse the error message from the response as JSON
      // hopefully there is something in the response that will help us understand the error that occurred
      const errorMessage = await res.json();
      error = errorMessage.error.message;
    } catch (err) {
      // If parsing fails, use the statusText and OK flag for better debugging information
      error = `${res.statusText} (${res.status})`;
    }
  } else {
    // set the data to be whatever we got back from the server
    data = await res.json()
  }
    return {error, data};
 }