import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import Layout from './layout/Layout';
import Home from './pages/Home';
import useTransformData from './hooks/useTransformData';
import LoginAlert from './components/LoginAlert';
import FallbackSpinner from './utils/FallbackSpinner';
import { FAQ, Contact, About } from './pages/menuPages';

const PostDetails = lazy(() => import('./pages/PostDetails'));
const Profile = lazy(() => import('./pages/Profile'));
const CustomizeProfile = lazy(() => import('./pages/CustomizeProfile'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PreviewImg = lazy(() => import('./pages/PreviewImg'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Login = lazy(() => import('./pages/Login'));
const CreatePost = lazy(() => import('./pages/CreatePost'));
const EditPost = lazy(() => import('./pages/EditPost'));
const DeletePost = lazy(() => import('./components/post/DeletePost'));
const EditComment = lazy(() => import('./pages/EditComment'));
const DeleteComment = lazy(() => import('./components/comment/DeleteComment'));
const SignOutConfirm = lazy(() => import('./components/SignOutConfirm'));
const Error = lazy(() => import('./pages/Error'));
const SavedPosts = lazy(() => import('./pages/SavedPosts'));
const Posts = lazy(() => import('./components/dashboard/Posts'));
const Drafts = lazy(() => import('./components/dashboard/Drafts'));
const Follower = lazy(() => import('./components/dashboard/Follower'));
const FollowingUser = lazy(() =>
   import('./components/dashboard/FollowingUser')
);
const Search = lazy(() => import('./components/search/Search'));

const App = () => {
   useTransformData();

   console.log('app render');

   return (
      <Box>
         <Suspense fallback={<FallbackSpinner />}>
            <Routes>
               <Route path='/' element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path='profile/:userIdToView' element={<Profile />} />
                  <Route path='/:user/:title' element={<PostDetails />} />
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
                  <Route path='readinglist' element={<SavedPosts />} />
                  <Route path='search' element={<Search />} />
                  <Route path='faq' element={<FAQ />} />
                  <Route path='contact' element={<Contact />} />
                  <Route path='about' element={<About />} />
               </Route>

               <Route path='edit-post' element={<EditPost />} />
               <Route path='create-post' element={<CreatePost />} />
               <Route path='preview/:url' element={<PreviewImg />} />
               <Route path='*' element={<Error />} />
            </Routes>
         </Suspense>

         {/* modal alert */}
         <LoginAlert />
      </Box>
   );
};

export default App;
