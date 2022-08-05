import { setAllPostDataToStore, setErr, setLoading } from './allPostData';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/firebase';

export const getAllPost = () => {
   return (dispatch) => {
      dispatch(setLoading(true));

      const colRef = collection(db, 'posts');
      const q = query(colRef, orderBy('createdAt', 'desc'));

      onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
         if (!snapshot.metadata.hasPendingWrites) {
            if (snapshot.docs.length === 0) {
               dispatch(setLoading(false));
               dispatch(setErr(true));
               return;
            }

            dispatch(setErr(false));
            dispatch(setLoading(false));

            const newData = [];
            snapshot.docs.forEach((doc) => {
               newData.push({ ...doc.data(), id: doc.id });
            });

            dispatch(setAllPostDataToStore(newData));
         }
      });
   };
};
