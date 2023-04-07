import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import {
  getItemFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "../helper/localStorage";
import { useSelector } from "react-redux";

const AuthCtx = createContext({
  user: null,
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(getItemFromLocalStorage("user") || null);

  const { profileData } = useSelector((state) => state.profileData);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        const newUser = {
          userId: user.uid,
        };

        setUser(newUser);

        saveToLocalStorage("user", JSON.stringify(newUser));

        return;
      }

      setUser(null);
      removeFromLocalStorage("user");
    });
  }, [profileData]);

  return <AuthCtx.Provider value={user}>{children}</AuthCtx.Provider>;
};

export const useAuth = () => useContext(AuthCtx);

export default AuthContextProvider;
