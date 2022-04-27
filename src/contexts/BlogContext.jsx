import { createContext, useEffect, useState } from "react";
import { addNewBlog, getData} from "../helpers/dataBaseFunctions";
import { EditUser } from "../helpers/dataBaseFunctions";
import { toastWarnNotify } from "../helpers/toastNotify";

export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
  const [blogDatas, setBlogDatas] = useState();
  const [dataArray, setDataArray] = useState();
  const [displayComment, setDisplayComment] = useState(false)

  const addComment = () => {
    setDisplayComment(!displayComment)
  }

  const handleFavoriteIcon = (e, data, currentUser) => {
    e.stopPropagation();
    if (!currentUser) {
      toastWarnNotify("please login to like")
    } else {
        if (data.likedUserIds) {
          if (data.likedUserIds.includes(currentUser.uid)) {
            EditUser({ ...data, likedUserIds: data.likedUserIds.filter((item) => !(item === currentUser.uid)) })
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
    getData(setDataArray);
    addNewBlog(blogDatas);
  }, [blogDatas]);

  return (
    <BlogContext.Provider value={{ setBlogDatas, dataArray, displayComment, setDisplayComment, addComment, handleFavoriteIcon}}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;