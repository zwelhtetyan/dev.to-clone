import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store/index';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import './index.scss';

import AuthContextProvider from './context/auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <Provider store={store}>
         <AuthContextProvider>
            <ChakraProvider theme={theme}>
               <BrowserRouter>
                  <App />
               </BrowserRouter>
            </ChakraProvider>
         </AuthContextProvider>
      </Provider>
   </React.StrictMode>
);
