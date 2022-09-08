import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box, Spinner } from '@chakra-ui/react';

import Layout from './layout/Layout';
import Home from './pages/Home';
import useTransformData from './hooks/useTransformData';

const PostDetails = React.lazy(() => import('./pages/PostDetails'));
const Profile = React.lazy(() => import('./pages/Profile'));
const CustomizeProfile = React.lazy(() => import('./pages/CustomizeProfile'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const PreviewImg = React.lazy(() => import('./pages/PreviewImg'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const Login = React.lazy(() => import('./pages/Login'));
const CreatePost = React.lazy(() => import('./pages/CreatePost'));
const EditPost = React.lazy(() => import('./pages/EditPost'));
const DeletePost = React.lazy(() => import('./components/post/DeletePost'));
const EditComment = React.lazy(() => import('./pages/EditComment'));
const DeleteComment = React.lazy(() =>
   import('./components/comment/DeleteComment')
);
const SignOutConfirm = React.lazy(() => import('./components/SignOutConfirm'));
const Error = React.lazy(() => import('./pages/Error'));
const SavedPosts = React.lazy(() => import('./pages/SavedPosts'));
const Posts = React.lazy(() => import('./components/dashboard/Posts'));
const Drafts = React.lazy(() => import('./components/dashboard/Drafts'));
const Follower = React.lazy(() => import('./components/dashboard/Follower'));
const FollowingUser = React.lazy(() =>
   import('./components/dashboard/FollowingUser')
);

const App = () => {
   useTransformData();

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
                  <Route path='/' element={<Home />} />
                  <Route path='profile/:userIdToView' element={<Profile />} />
                  <Route path='details/:id' element={<PostDetails />} />
                  <Route path='create-account' element={<SignUp />} />
                  <Route path='login' element={<Login />} />
                  <Route path='signout-confirm' element={<SignOutConfirm />} />
                  <Route
                     path='customize-profile'
                     element={<CustomizeProfile />}
                  />
                  <Route path='dashboard' element={<Dashboard />}>
                     <Route index element={<Posts />} />
                     <Route path='drafts' element={<Drafts />} />
                     <Route path='followers' element={<Follower />} />
                     <Route
                        path='following_users'
                        element={<FollowingUser />}
                     />
                  </Route>
                  <Route path='delete-post' element={<DeletePost />} />
                  <Route path='delete-comment' element={<DeleteComment />} />
                  <Route path='edit-comment' element={<EditComment />} />
                  <Route path='reading' element={<SavedPosts />} />
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
