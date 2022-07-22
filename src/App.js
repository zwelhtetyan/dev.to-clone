import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './GlobalStyles';
import Layout from './layout/Layout';
import useTheme from './theme/theme';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';

const App = () => {
   //custom hooks
   const { theme, toggleTheme } = useTheme();

   return (
      <div className='app'>
         <ThemeProvider theme={theme}>
            <GlobalStyles />

            <Layout>
               <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/create-post' element={<CreatePost />} />
               </Routes>
            </Layout>
         </ThemeProvider>
      </div>
   );
};

export default App;
