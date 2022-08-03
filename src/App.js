import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import { Box } from '@chakra-ui/react';
import ViewPost from './pages/ViewPost';
import PreviewImg from './pages/PreviewImg';

const App = () => {
   return (
      <Box className='app'>
         <Layout>
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='create-post' element={<CreatePost />} />
               <Route path='details/:id' element={<ViewPost />} />
               <Route path='preview/:url' element={<PreviewImg />} />
               <Route path='*' element={<h1>Page not found!</h1>} />
            </Routes>
         </Layout>
      </Box>
   );
};

export default App;
