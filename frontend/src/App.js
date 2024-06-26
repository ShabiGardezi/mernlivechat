<<<<<<< HEAD
 import {useState,useContext,lazy,Suspense,useEffect} from 'react'
=======
import {useState,useContext,lazy,Suspense,useEffect} from 'react'
>>>>>>> 7b41ae252efcd20fe6bf32f350a36250aec2a145
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
import axios from "axios"
import constants from './constants';
const Home=lazy(()=>import("./components/Home"))


function App() {
  const { user,setuser } = useContext(userContext);
  useEffect(() => {
   
    let verifyToken=JSON.parse(localStorage.getItem("token"));
  if(verifyToken){
    
    axios.get(`${constants.baseUrl}/api/verifyToken`, { headers: { token: verifyToken } }).then((res)=>{
      if(res.data.success){
        setuser(res.data.payload);
      
      }
      // else
      // console.log(res.data.payload)
     
    });
  }
  
   
  }, [])
  
  

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
