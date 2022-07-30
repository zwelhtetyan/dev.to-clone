import {
   deleteObject,
   getDownloadURL,
   ref,
   uploadBytes,
} from 'firebase/storage';
import { storage } from '../firebase';

export const uploadImage = async (img, selectedImgPath) => {
   const cvImgRef = ref(storage, selectedImgPath);
   await uploadBytes(cvImgRef, img);

   const url = await getDownloadURL(cvImgRef);
   return url;
};

export const removeImage = async (path) => {
   const desertRef = ref(storage, path);
   await deleteObject(desertRef);
   console.log('removed image');
};
