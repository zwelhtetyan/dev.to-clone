import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/firebase';
import useGetData from '../../hooks/useGetData';

export const getData = () => {
   return (dispatch) => {
      const postRef = collection(db, 'posts');
      const queryPostRef = query(postRef, orderBy('createdAt', 'desc'));
      const userRef = collection(db, 'users');

      useGetData(queryPostRef, dispatch, 'posts');
      useGetData(userRef, dispatch, 'users');
   };
};
