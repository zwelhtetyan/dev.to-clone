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
   setTransformedData,
   setTransformedDataErr,
   setTransformedDataLoading,
} from './store/data/transformedData';
import CustomizeProfile from './pages/CustomizeProfile';
import Dashboard from './pages/Dashboard';
import {
   setProfileData,
   setProfileDataErr,
   setProfileDataLoading,
} from './store/user/profileData';
import EditComment from './pages/EditComment';

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

   // transform data logic
   let modifiedPostData = null;

   if (allPostData && userData && !loading && !err) {
      const changedPostData = allPostData.map((postData) => {
         const userInfo = userData.find((data) => data.id === postData.userId);

         return {
            ...postData,
            name: userInfo?.name,
            profile: userInfo?.profile,
         };
      });

      modifiedPostData = changedPostData;
   }
   // transform data logic end

   useEffect(() => {
      dispatch(setTransformedData(modifiedPostData));
      dispatch(setTransformedDataLoading(loading));
      dispatch(setTransformedDataErr(err));
   }, [dispatch, err, loading, modifiedPostData]);

   // //fetch profile data
   useEffect(() => {
      dispatch(setProfileData(userData));
      dispatch(setProfileDataLoading(userLoading));
      dispatch(setProfileDataErr(userErr));
   }, [dispatch, userData, userLoading, userErr]);

   console.log('app render');

   return (
      <Box>
         <Routes>
            <Route path='/' element={<Layout />}>
               <Route index element={<Home />} />
               <Route path='profile/:userIdToView' element={<Profile />} />
               <Route path='details/:id' element={<PostDetails />} />
               <Route path='create-account' element={<SignUp />} />
               <Route path='login' element={<Login />} />
               <Route path='delete-confirm' element={<DeleteConfirm />} />
               <Route path='signout-confirm' element={<SignOutConfirm />} />
               <Route path='customize-profile' element={<CustomizeProfile />} />
               <Route path='dashboard' element={<Dashboard />} />
               <Route path='edit-comment' element={<EditComment />} />
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
