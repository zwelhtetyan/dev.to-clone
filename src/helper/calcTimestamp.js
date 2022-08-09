export const calTimeStamp = (timeStamp) => {
   return new Date(timeStamp.seconds * 1000).toISOString();
};

export const dateFormat = (timeStamp) => {
   const date = new Date(timeStamp.seconds * 1000)
      .toDateString()
      .split(' ')
      .slice(1, 3);
   const dateFormat = [date[0], +date[1]].join(' ');
   return dateFormat;
};
