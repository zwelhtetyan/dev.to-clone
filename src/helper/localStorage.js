export const saveToLocalStorage = (key, value) => {
   localStorage.setItem(key, value);
};

export const removeFromLocalStorage = (key) => {
   localStorage.removeItem(key);
};

export const getItemFromLocalStorage = (key) => {
   return JSON.parse(localStorage.getItem(key));
};
