import React, { useEffect, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box, Spinner } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import Layout from './layout/Layout';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import PreviewImg from './pages/PreviewImg';
import DeletePost from './components/DeletePost';
import EditPost from './pages/EditPost';
import Error from './pages/Error';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import SignOutConfirm from './components/SignOutConfirm';
import useGetData from './hooks/useGetData';
import EditComment from './pages/EditComment';
import DeleteComment from './components/DeleteComment';
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
               <Spinner
                  size='md'
                  mr='1'
                  pos='fixed'
                  color='rgb(59 73 223)'
                  top={1.5}
                  right={1.5}
               />
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
