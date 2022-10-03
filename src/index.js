import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store/index';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme/theme';
import AuthContextProvider from './context/auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <Provider store={store}>
         <AuthContextProvider>
            <ChakraProvider theme={theme} resetCSS>
               <BrowserRouter>
                  <ColorModeScript
                     initialColorMode={theme.config.initialColorMode}
                  />
                  <App />
               </BrowserRouter>
            </ChakraProvider>
         </AuthContextProvider>
      </Provider>
   </React.StrictMode>
);
