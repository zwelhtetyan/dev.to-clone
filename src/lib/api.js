import {
   addDoc,
   collection,
   deleteDoc,
   doc,
   serverTimestamp,
   setDoc,
   updateDoc,
} from 'firebase/firestore';
import {
   deleteObject,
   getDownloadURL,
   ref,
   uploadBytes,
} from 'firebase/storage';
import { db, storage } from '../config/firebase';
import converter from '../helper/converter';

//upload image
export const uploadImage = async (img, selectedImgPath) => {
   const cvImgRef = ref(storage, selectedImgPath);
   await uploadBytes(cvImgRef, img);

   const url = await getDownloadURL(cvImgRef);
   return url;
};

//remove image
export const removeImage = async (path) => {
   const desertRef = ref(storage, path);
   await deleteObject(desertRef);
   console.log('removed image');
};

//cretae user
export const createUser = async (userId, userData) => {
   await setDoc(doc(db, 'users', userId), userData);
};

//create post
export const createPost = async (postData) => {
   await addDoc(collection(db, 'posts'), {
      ...postData,
      createdAt: serverTimestamp(),
      comments: [],
      readTime: Math.ceil(
         converter().makeHtml(postData.MDEValue).split(' ').length / 200
      ),
   });
};

//delete post
export const deletePost = async (postId) => {
   const docRef = doc(db, 'posts', postId);

   deleteDoc(docRef)
      .then((_) => console.log('deleted post successfully'))
      .catch((err) => console.log(err));
};

//edit post => update document without overwriting
export const editPost = async (postData, postId) => {
   const docRef = doc(db, 'posts', postId);

   await updateDoc(docRef, {
      ...postData,
      createdAt: serverTimestamp(),
      readTime: Math.ceil(
         converter().makeHtml(postData.MDEValue).split(' ').length / 200
      ),
      isUpdated: true,
   });
};
