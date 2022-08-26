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

export const isLimitedDate = (createdAt) => {
   const createdDate = createdAt.seconds;
   const currentDate = Math.floor(new Date().getTime() / 1000);
   const limitedDate = currentDate - createdDate;

   return limitedDate > 432000;
};

export const showEditedDate = (createdAt, updatedAt) => {
   const reg = /\d+/;
   const postedDate = dateFormat(createdAt);
   const editedDate = dateFormat(updatedAt);
   return postedDate.match(reg)[0] < editedDate.match(reg)[0];
};

export const joinOnDate = (createdAt) => {
   const date = new Date(+createdAt).toDateString().split(' ').slice(1, 4);
   return [date[0], +date[1] + ',', date[2]].join(' ');
};
