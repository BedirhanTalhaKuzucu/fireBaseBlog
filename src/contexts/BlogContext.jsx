import { createContext, useEffect, useState } from "react";
import { addNewBlog, getData, EditUser} from "../helpers/firebase";

export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
  const [blogDatas, setBlogDatas] = useState();
  const [dataArray, setDataArray] = useState();


  useEffect(() => {
    getData(setDataArray);
    addNewBlog(blogDatas);
  }, [blogDatas]);


  return (
    <BlogContext.Provider value={{ setBlogDatas, dataArray}}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;