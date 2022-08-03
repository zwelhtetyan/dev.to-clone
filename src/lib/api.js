import { deleteDoc, doc } from 'firebase/firestore';
import {
   deleteObject,
   getDownloadURL,
   ref,
   uploadBytes,
} from 'firebase/storage';
import { db, storage } from '../firebase';

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

export const deletePost = async (id) => {
   const docRef = doc(db, 'posts', id);

   deleteDoc(docRef)
      .then((_) => console.log('deleted post successfully'))
      .catch((err) => console.log(err));
};
