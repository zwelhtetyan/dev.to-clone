export const titleRoute = (name, title, id) => {
   return (
      name.split(' ').join('') + '/' + title.split(' ').join('-') + `-${id}`
   );
};
