// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback(event);
  });
  qs(selector).addEventListener("click", callback);
}

export function openUserMenu(selector) {
  setClick(selector, (e) => {
    e.stopPropagation();
    const el = document.querySelector(".user__menu");
    el.classList.toggle("open");
  });
  setClick("body", () => {
    const openMenus = document.querySelectorAll(".open");
    openMenus.forEach((el) => {
      el.classList.remove("open");
    });
  });
}
