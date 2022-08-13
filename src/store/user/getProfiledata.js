import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { setProfileData } from './profileData';

export const getProfileData = (userId) => {
   return (dispatch) => {
      const docRef = doc(db, 'users', userId);

      onSnapshot(docRef, { includeMetadataChanges: true }, (snapshot) => {
         if (!snapshot.metadata.hasPendingWrites) {
            dispatch(setProfileData(snapshot.data()));
         }
      });
   };
};
