export const joinOnDate = (createdAt) => {
   const date = new Date(+createdAt).toDateString().split(' ').slice(1, 4);
   return [date[0], +date[1] + ',', date[2]].join(' ');
};
