import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import Home from '../pages/Home';

const SignUp = lazy(() => import('../pages/SignUp'));
const Login = lazy(() => import('../pages/Login'));

const PostDetails = lazy(() => import('../pages/PostDetails'));

const CreatePost = lazy(() => import('../pages/CreatePost'));
const EditPost = lazy(() => import('../pages/EditPost'));
const DeletePost = lazy(() => import('../components/post/DeletePost'));

const SavedPosts = lazy(() => import('../pages/SavedPosts'));
const Search = lazy(() => import('../components/search/Search'));

const Profile = lazy(() => import('../pages/Profile'));
const CustomizeProfile = lazy(() => import('../pages/CustomizeProfile'));

const Apperance = lazy(() => import('../pages/Apperance'));

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Posts = lazy(() => import('../components/dashboard/Posts'));
const Drafts = lazy(() => import('../components/dashboard/Drafts'));
const Follower = lazy(() => import('../components/dashboard/Follower'));
const FollowingTag = lazy(() => import('../components/dashboard/FollowingTag'));
const FollowingUser = lazy(() =>
   import('../components/dashboard/FollowingUser')
);

const DeleteComment = lazy(() => import('../components/comment/DeleteComment'));
const EditComment = lazy(() => import('../pages/EditComment'));

const About = lazy(() => import('../pages/menuPages/About'));
const Contact = lazy(() => import('../pages/menuPages/Contact'));
const FAQ = lazy(() => import('../pages/menuPages/FAQ'));
const PreviewImg = lazy(() => import('../pages/PreviewImg'));

const Tags = lazy(() => import('../pages/tags/Tags'));
const TagDetail = lazy(() => import('../pages/tags/viewTag/TagDetail'));

const Error = lazy(() => import('../pages/Error'));
const SignOutConfirm = lazy(() => import('../components/SignOutConfirm'));

const ConfigRoute = () => {
   return (
      <Routes>
         <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/:username' element={<Profile />} />
            <Route path='/:user/:title' element={<PostDetails />} />
            <Route path='create-account' element={<SignUp />} />
            <Route path='login' element={<Login />} />
            <Route path='customize-profile' element={<CustomizeProfile />} />
            <Route path='signout-confirm' element={<SignOutConfirm />} />
            <Route path='apperance' element={<Apperance />} />

            {/* dashboard routes */}
            <Route path='dashboard' element={<Dashboard />}>
               <Route index element={<Posts />} />
               <Route path='drafts' element={<Drafts />} />
               <Route path='following_tags' element={<FollowingTag />} />
               <Route path='followers' element={<Follower />} />
               <Route path='following_users' element={<FollowingUser />} />
            </Route>

            <Route path='delete-post' element={<DeletePost />} />
            <Route path='delete-comment' element={<DeleteComment />} />
            <Route path='edit-comment' element={<EditComment />} />
            <Route path='readinglist' element={<SavedPosts />} />
            <Route path='search' element={<Search />} />
            <Route path='faq' element={<FAQ />} />
            <Route path='tags' element={<Tags />} />
            <Route path='/tags/:tagName' element={<TagDetail />} />
            <Route path='contact' element={<Contact />} />
            <Route path='about' element={<About />} />
         </Route>

         {/* routes outside layout must not contain [Header && Footer] */}
         <Route path='edit-post' element={<EditPost />} />
         <Route path='create-post' element={<CreatePost />} />
         <Route path='preview/:url' element={<PreviewImg />} />
         <Route path='*' element={<Error />} />
      </Routes>
   );
};

export default ConfigRoute;
