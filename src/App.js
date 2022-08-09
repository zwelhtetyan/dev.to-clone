import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import PreviewImg from './pages/PreviewImg';
import DeleteConfirm from './components/DeleteConfirm';
import EditPost from './pages/EditPost';
import { Box } from '@chakra-ui/react';
import Error from './pages/Error';
import PostDetails from './pages/PostDetails';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { getAllPost } from './store/post/getAllPost';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

import { useAuth } from './context/auth';
import Profile from './pages/Profile';
import SignOutConfirm from './components/SignOutConfirm';

const App = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getAllPost());
   }, [dispatch]);

   const user = useAuth();

   return (
      <Box>
         <Routes>
            <Route path='/' element={<Layout />}>
               <Route index element={<Home />} />
               <Route path='details/:id' element={<PostDetails />} />
               <Route path='profile' element={<Profile />} />
               {user && (
                  <>
                     <Route path='delete-confirm' element={<DeleteConfirm />} />
                     <Route
                        path='signout-confirm'
                        element={<SignOutConfirm />}
                     />
                  </>
               )}
               <Route path='create-account' element={<SignUp />} />
               <Route path='login' element={<Login />} />
            </Route>

            <Route path='edit-post' element={<EditPost />} />
            <Route path='create-post' element={<CreatePost />} />
            <Route path='preview/:url' element={<PreviewImg />} />
            <Route path='*' element={<Error />} />
         </Routes>
      </Box>
   );
};

export default App;
