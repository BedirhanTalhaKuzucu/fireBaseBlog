import { createContext, useEffect, useState } from "react";
import { userObserver } from "../helpers/firebase";
import { EditUser } from "../helpers/firebase";
import { toastSuccessNotify, toastWarnNotify } from "../helpers/toastNotify";


export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const handleFavoriteIcon = (e, data) => {
    e.stopPropagation();
    if (!currentUser) {
      toastWarnNotify("please login to like")
    } else {
        if (data.likedUserIds) {
          if (data.likedUserIds.includes(currentUser.uid)) {
            EditUser({ ...data, likedUserIds: data.likedUserIds.filter((item) => !(item === currentUser.uid)) })
            data.likedUserIds.filter((item) => !(item === currentUser.uid))
          } else {
            data.likedUserIds.push(currentUser.uid)
            EditUser({ ...data, likedUserIds: data.likedUserIds })
          }
        } else {
          EditUser({ ...data, likedUserIds: currentUser.uid.split(" ") })
        }
    }
  }

  useEffect(() => {
    userObserver(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, handleFavoriteIcon }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;