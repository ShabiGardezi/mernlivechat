<<<<<<< HEAD
 import React from 'react';
=======
import React from 'react';
>>>>>>> 7b41ae252efcd20fe6bf32f350a36250aec2a145
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react'
import {UserState} from "./context/userState"
import theme from './theme'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ChakraProvider>
     <UserState>
     <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
      </UserState>
    </ChakraProvider>
  //  </React.StrictMode>
);


reportWebVitals();
