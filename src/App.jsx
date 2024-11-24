import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './components/Header';
import Footer from './components/Footer';
import AddUser from './pages/AddUser';
import UserList from './pages/UserList';
import RolesList from './pages/RolesList';
import PermissionsList from './pages/PermissionsList';
import AddPermisson from './pages/AddPermisson';
import AddRole from './pages/AddRole';
import UpdatePermission from './pages/UpdatePermission';
import UpdateRole from './pages/UpdateRole';
import UpdateUser from './pages/UpdateUser';
import ViewUserDetails from './pages/ViewUserDetails';
function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/users' element={<UserList />}/>
      <Route path='/view-user/:id' element={<ViewUserDetails />}/>
      <Route path='/add-user' element={<AddUser />}/>
      <Route path='/update-user/:id' element={<UpdateUser />}/>
      <Route path='/roles' element={<RolesList />}/>
      <Route path='/add-role' element={<AddRole />}/>
      <Route path='/update-role/:id' element={<UpdateRole />}/>
      <Route path='/permissions' element={<PermissionsList />}/>
      <Route path='/update-permission/:id' element={<UpdatePermission />}/>
      <Route path='/add-permission' element={<AddPermisson />}/>
    </Routes>
      <Footer/>
    </>
  )
}

export default App
