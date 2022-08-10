import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { setLoading, setUserData } from './userData';

export const getUserData = () => {
   return async (dispatch) => {
      dispatch(setLoading(true));

      const querySnapshot = await getDocs(collection(db, 'users'));
      const userData = [];
      querySnapshot.forEach((doc) => {
         const newUserData = { ...doc.data(), id: doc.id };
         userData.push(newUserData);
      });

      dispatch(setLoading(false));
      dispatch(setUserData(userData));
   };
};
