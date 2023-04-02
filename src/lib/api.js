import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "../config/firebase";

export const uploadImage = async (img, selectedImgPath) => {
  const cvImgRef = ref(storage, selectedImgPath);
  await uploadBytes(cvImgRef, img);

  const url = await getDownloadURL(cvImgRef);
  // console.log('image uploaded successfully');
  return url;
};

export const removeImage = async (url) => {
  const desertRef = ref(storage, url);
  await deleteObject(desertRef);

  // console.log('removed image');
};

export const createUser = async (userId, userData) => {
  await setDoc(doc(db, "users", userId), userData, { merge: true });
};

export const createPost = async (postData) => {
  await addDoc(collection(db, "posts"), {
    ...postData,
    createdAt: serverTimestamp(),
    comments: [],
    readTime: Math.ceil(postData.MDEValue.trim().split(/\s+/).length / 200),
  });
};

export const draftPost = async (postData) => {
  await setDoc(doc(db, "posts", postData.id), { ...postData, comments: [] });
};

export const editPost = async (postData) => {
  const docRef = doc(db, "posts", postData.id);

  await updateDoc(docRef, {
    ...postData,
    updatedAt: serverTimestamp(),
    readTime: Math.ceil(postData.MDEValue.trim().split(/\s+/).length / 200),
  });
};

export const deletePost = async (postId) => {
  const docRef = doc(db, "posts", postId);

  deleteDoc(docRef)
    .then((_) => {
      // console.log('deleted post successfully')
    })
    .catch((err) => console.log(err));
};

export const updateProfileData = async (profileData, userId) => {
  const docRef = doc(db, "users", userId);

  await updateDoc(docRef, profileData);
};

export const updateComment = async (comments, postId) => {
  const docRef = doc(db, "posts", postId);

  await updateDoc(docRef, { comments });
};

export const updatePostReaction = async (data, postId) => {
  const docRef = doc(db, "posts", postId);

  await updateDoc(docRef, data);
};

export const saveArchive = async (data, postId) => {
  const docRef = doc(db, "posts", postId);

  await updateDoc(docRef, data);
};

export const pinPost = async (postId, pinned) => {
  const docRef = doc(db, "posts", postId);

  await updateDoc(docRef, { pinned });
};
