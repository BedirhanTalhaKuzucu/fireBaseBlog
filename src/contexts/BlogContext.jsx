import { createContext, useEffect, useState } from "react";
import { addNewBlog, getData, EditUser} from "../helpers/firebase";

export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
  const [blogDatas, setBlogDatas] = useState();
  const [dataArray, setDataArray] = useState();
  const [displayComment, setDisplayComment] = useState(false)

  const addComment = () => {
    setDisplayComment(!displayComment)
  }

  useEffect(() => {
    getData(setDataArray);
    addNewBlog(blogDatas);
  }, [blogDatas]);


  return (
    <BlogContext.Provider value={{ setBlogDatas, dataArray, displayComment, setDisplayComment, addComment  }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;