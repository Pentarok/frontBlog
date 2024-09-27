
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

import Adduser from './Register';
import Login from './login';
import Update from './Update';

import Users from './users';
import SignUp from './signUp';
import Homepage from './homepage';
import Dashboard from './dashboard';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import UserPage from './UserPage';
import Upload from './Upload';
import EditPost from './EditPost'
import UserBlogs from './userBlogs';
import UserCreatePost from './userCreatePost';
import Layout from './Layout.jsx';
import Posts from './posts.jsx';
import HomeLayout from './homelayout.jsx';
import Profile from './UserPage';
function App() {
  return (
    <BrowserRouter>
    
      <Routes>
       <Route path='/register' element={<Adduser/>}></Route>
     
       <Route path='/reset-password/:id/:token' element={<ResetPassword/>}></Route>
       <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
     
       <Route path='/users/update/:id' element={<Update/>}></Route>
       <Route path='/user/:id' element={<Users/>}></Route>
       <Route path='/users' element={<Users/>}></Route>
       
       <Route path='/dashboard' element={<Dashboard/>}></Route>
       <Route path='/edit/:id' element={<EditPost/>}></Route>
   
       <Route path='/upload' element={<Upload/>}></Route>

       <Route path="/" element={<Layout />}>
            <Route path="/blogs" element={<UserBlogs />} />
            <Route path="/user" element={<Posts />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/create/post" element={<UserCreatePost />} />
            
       </Route>
       <Route path="/" element={<HomeLayout />}>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/home' element={<Homepage/>}></Route>
              <Route path='/signup' element={<SignUp/>}></Route>
       </Route>
      </Routes>

  
    </BrowserRouter>
  );
}

export default App;
