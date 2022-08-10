import { onSnapshot } from 'firebase/firestore';
import { setAllPostData, setPostStatus } from '../store/post/allPostData';
import { setUserData, setUserStatus } from '../store/user/userData';

const useGetData = (colRef, dispatch, colName) => {
   const pending = { loading: true, err: false };
   const error = { loading: false, err: true };
   const success = { loading: false, err: false };

   //helper
   const setStatusFunc = (status) => {
      if (colName === 'posts') {
         dispatch(setPostStatus(status));
      } else if (colName === 'users') {
         dispatch(setUserStatus(status));
      }
   };

   setStatusFunc(pending);

   onSnapshot(colRef, { includeMetadataChanges: true }, (snapshot) => {
      if (!snapshot.metadata.hasPendingWrites) {
         if (snapshot.docs.length === 0) {
            setStatusFunc(error);
            return;
         }

         setStatusFunc(success);

         const newData = [];
         snapshot.docs.forEach((doc) => {
            newData.push({ ...doc.data(), id: doc.id });
         });

         if (colName === 'posts') {
            dispatch(setAllPostData(newData));
         } else if (colName === 'users') {
            dispatch(setUserData(newData));
         }
      }
   });
};

export default useGetData;
