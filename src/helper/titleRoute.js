export const titleRoute = (name, title, id) => {
   return name + '/' + title.split(' ').join('-') + `_${id}`;
};
