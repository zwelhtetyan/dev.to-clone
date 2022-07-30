export const calTimeStamp = (timeStamp) =>
   new Date(timeStamp.seconds * 1000).toISOString();
