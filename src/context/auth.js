import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import {
   getItemFromLocalStorage,
   saveToLocalStorage,
} from '../helper/localStorage';

const AuthCtx = createContext({
   user: null,
});

const AuthContextProvider = ({ children }) => {
   const [user, setUser] = useState(getItemFromLocalStorage('user') || null);

   useEffect(() => {
      onAuthStateChanged(auth, (user) => {
         if (user !== null) {
            const newUser = {
               name: user.displayName,
               uid: user.uid,
               photoURL: user.providerData[0].photoURL,
               createdAt: user.metadata.createdAt,
            };
            setUser(newUser);
            saveToLocalStorage('user', JSON.stringify(newUser));
            return;
         }
         setUser(null);
      });
   }, []);

   return <AuthCtx.Provider value={user}>{children}</AuthCtx.Provider>;
};

export const useAuth = () => useContext(AuthCtx);

export default AuthContextProvider;
