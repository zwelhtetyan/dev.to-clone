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
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SignOutConfirm from './components/SignOutConfirm';
import useGetData from './hooks/useGetData';
import {
   setTransformData,
   setTransformedDataErr,
   setTransformedDataLoading,
} from './store/data/transformedData';

const App = () => {
   const dispatch = useDispatch();

   const {
      data: allPostData,
      loading: postLoading,
      err: postErr,
   } = useGetData('posts');

   const {
      data: userData,
      loading: userLoading,
      err: userErr,
   } = useGetData('users');

   const loading = postLoading || userLoading;
   const err = postErr || userErr;

   let modifiedPostData = null;

   if (allPostData && userData && !loading && !err) {
      const changedPostData = allPostData.map((postData) => {
         const userInfo = userData.find((data) => data.id === postData.userId);

         return {
            ...postData,
            name: userInfo.name,
            profile: userInfo.porfile,
         };
      });

      modifiedPostData = changedPostData;
   }

   useEffect(() => {
      dispatch(setTransformData(modifiedPostData));
      dispatch(setTransformedDataLoading(loading));
      dispatch(setTransformedDataErr(err));
   }, [dispatch, err, loading, modifiedPostData]);

   console.log('app render');

   return (
      <Box>
         <Routes>
            <Route path='/' element={<Layout />}>
               <Route index element={<Home />} />
               <Route path='profile' element={<Profile />} />
               <Route path='details/:id' element={<PostDetails />} />
               <Route path='delete-confirm' element={<DeleteConfirm />} />
               <Route path='signout-confirm' element={<SignOutConfirm />} />
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
