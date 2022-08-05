import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import { Box } from '@chakra-ui/react';
import PreviewImg from './pages/PreviewImg';
import DeleteConfirm from './components/DeleteConfirm';
import EditPost from './pages/EditPost';
import Error from './pages/Error';
import PostDetails from './pages/PostDetails';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { getAllPost } from './store/post/getAllPost';

const App = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getAllPost());
   }, [dispatch]);

   return (
      <Box>
         <Routes>
            <Route path='/' element={<Layout />}>
               <Route index element={<Home />} />
               <Route path='/details/:id' element={<PostDetails />} />
               <Route path='delete_confirm' element={<DeleteConfirm />} />
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
