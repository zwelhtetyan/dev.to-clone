import { removeImage } from '../lib/api';

export const removeUnnecessaryUploadedMDEImg = (imgURLs, MDEValue) => {
   imgURLs.forEach((img) => {
      if (!MDEValue?.includes(img.MDEURL)) {
         removeImage(img.url).catch((err) => console.log(err));
      }
   });
};
