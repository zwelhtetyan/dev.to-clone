import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import { Box } from '@chakra-ui/react';
import ViewPost from './pages/ViewPost';

const App = () => {
   return (
      <Box className='app'>
         <Layout>
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/create-post' element={<CreatePost />} />
               <Route path='/details/:id' element={<ViewPost />} />
            </Routes>
         </Layout>
      </Box>
   );
};

export default App;
