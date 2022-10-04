import {useState,useContext,lazy,Suspense} from 'react'
import './App.css';
import Login from './components/Login';
import Signup from './components/SignUp';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import Home from './components/Home';
import {userContext} from "./context/userState"
import Loader from './components/Loader';
import { Flex } from '@chakra-ui/react';
const Home=lazy(()=>import("./components/Home"))


function App() {
  const { user } = useContext(userContext);
  

  return (

    
    <BrowserRouter>
    {!user? 
     <Routes>
     <>
     <Route path="/" element={<Login/>} />
     <Route path="/signup" element={<Signup />} />
     </>
     </Routes>
     :
     <>
    
     <Routes>
      
    <Route path="/" element={
    <Suspense fallback={<Flex h="100vh" w="100vw" align={"center"} justifyContent="center" ><Loader></Loader></Flex> } >
    <Home />
    </Suspense>
    } />
      </Routes>
    </>
      }
  </BrowserRouter>
  
  );
}

export default App;
