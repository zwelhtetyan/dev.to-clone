import React, { useEffect, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box, Spinner } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import Layout from './layout/Layout';
import Home from './pages/Home';
import useGetData from './hooks/useGetData';

import {
   setTransformedData,
   setTransformedDataErr,
   setTransformedDataLoading,
} from './store/data/transformedData';
import {
   setProfileData,
   setProfileDataErr,
   setProfileDataLoading,
} from './store/user/profileData';

const PostDetails = React.lazy(() => import('./pages/PostDetails'));
const Profile = React.lazy(() => import('./pages/Profile'));
const CustomizeProfile = React.lazy(() => import('./pages/CustomizeProfile'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const PreviewImg = React.lazy(() => import('./pages/PreviewImg'));
const CreatePost = React.lazy(() => import('./pages/CreatePost'));
const EditPost = React.lazy(() => import('./pages/EditPost'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const Login = React.lazy(() => import('./pages/Login'));
const DeletePost = React.lazy(() => import('./components/DeletePost'));
const Error = React.lazy(() => import('./pages/Error'));
const SignOutConfirm = React.lazy(() => import('./components/SignOutConfirm'));
const EditComment = React.lazy(() => import('./pages/EditComment'));
const DeleteComment = React.lazy(() => import('./components/DeleteComment'));

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
         <Suspense
            fallback={
               <Box
                  pos='fixed'
                  top='50%'
                  left='50%'
                  transform='translate(-50%, -50%)'
               >
                  <Spinner size='lg' color='rgb(59 73 223)' />
               </Box>
            }
         >
            <Routes>
               <Route path='/' element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path='profile/:userIdToView' element={<Profile />} />
                  <Route path='details/:id' element={<PostDetails />} />
                  <Route path='create-account' element={<SignUp />} />
                  <Route path='login' element={<Login />} />
                  <Route path='signout-confirm' element={<SignOutConfirm />} />
                  <Route
                     path='customize-profile'
                     element={<CustomizeProfile />}
                  />
                  <Route path='dashboard' element={<Dashboard />} />
                  <Route path='delete-post' element={<DeletePost />} />
                  <Route path='delete-comment' element={<DeleteComment />} />
                  <Route path='edit-comment' element={<EditComment />} />
               </Route>

               <Route path='edit-post' element={<EditPost />} />
               <Route path='create-post' element={<CreatePost />} />
               <Route path='preview/:url' element={<PreviewImg />} />
               <Route path='*' element={<Error />} />
            </Routes>
         </Suspense>
      </Box>
   );
};

export default App;
