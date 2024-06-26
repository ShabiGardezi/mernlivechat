<<<<<<< HEAD
 import {React,useState,useContext} from 'react'
=======
import {React,useState,useContext} from 'react'
>>>>>>> 7b41ae252efcd20fe6bf32f350a36250aec2a145
import { Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Button, Heading, Text, useColorModeValue,Link } from "@chakra-ui/react"
import { useFormik } from "formik";
import axios from "axios"
import { Link as routerLink } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
import {userContext} from "../context/userState"
import constants from '../constants';
function Login(props) {

  const [isloading, setisloading] = useState(false);
  const {setuser } = useContext(userContext);

  const toast = useToast();
  const showtoast = ({ title, description, status, duration }) => {
      toast({
          title,
          description,
          status,
          duration,
          isClosable: true,
      })
  }



  const formik = useFormik({
    initialValues: {
      email: '',
      password: ""
    },
    onSubmit: (values) => {
      setisloading(true);
      const email = values.email;
      const password = values.password;

      // axios.post(`http://localhost:5000/api/loginuser`, { email, password })
      axios
        .post(`${constants.baseUrl}/api/loginuser`, { email, password })
        .then((res) => {
          // console.log(res.data);
          setisloading(false);

          if (res.data.success) {
            setuser(res.data.payload.user);
            localStorage.setItem(
              "token",
              JSON.stringify(res.data.payload.token)
            );
          } else {
            showtoast({
              title: "ERROR OCCURED",
              description: res.data.payload,
              status: "error",
              duration: 8000,
            });
          }
        })
        .catch(function (error) {
          setisloading(false);
          toast({
            title: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  })




  return (

    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Login in to your account</Heading>
          
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <form onSubmit={formik.handleSubmit}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input name='email' onChange={formik.handleChange} type="email" isRequired/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input mb="25px" name='password' onChange={formik.handleChange} type="password" isRequired/>
            </FormControl>
            <Stack spacing={10}>
             
              <Button
              
              type='submit'
              isLoading={isloading ? true : false}
              loadingText="Signing In"
              spinnerPlacement='end'
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Not a user? <Link  fontWeight="semibold" as={routerLink} to="/signup">SignUp</Link>
              </Text>
            </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login