import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from '../components/Navbar'
import Login from "../pages/Login"
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard';
import Profile from "../pages/Profile";
import NewBlog from "../pages/NewBlog";
import Details from "../pages/Details"
import UpdateBlog from '../pages/UpdateBlog';
import PrivateRouter from './PrivateRouter';
import PrivateRouterforLoginRegister from "./PrivateRouterforLoginRegister"

function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route element={<PrivateRouterforLoginRegister />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        
        <Route element={<PrivateRouter />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/new-blog" element={<NewBlog />} />
          <Route path="/details/:Id" element={<Details />} />
          <Route path="/updateblog/:Id" element={<UpdateBlog />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter