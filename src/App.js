import AppRouter from "./app-router/AppRouter";
import "./App.scss";
import BlogContextProvider from "./contexts/BlogContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BlogContextProvider>
        <AppRouter />
        <ToastContainer />
      </BlogContextProvider>
    </div>
  );
}

export default App;
