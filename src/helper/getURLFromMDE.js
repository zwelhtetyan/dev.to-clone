export const getURLFromMDE = (value) => {
   const urls = value.match(/!\[(.*?)\]\((.*?)\)/g);

   const prevUploadedMDEImgToEdit = urls?.map((url) => ({
      MDEURL: url,
      url: url
         .split('')
         .slice(4, url.length - 1)
         .join(''),
   }));

   return prevUploadedMDEImgToEdit || [];
};
