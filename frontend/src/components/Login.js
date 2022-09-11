import {React,useState} from 'react'
import { Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Button, Heading, Text, useColorModeValue,Link } from "@chakra-ui/react"
import { useFormik } from "formik";
import axios from "axios"
import { Link as routerLink } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
function Login(props) {

  const [isloading, setisloading] = useState(false);


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

      axios.post(`http://localhost:5000/api/loginuser`, { email, password })
        .then(res => {
          // console.log(res.data);
          setisloading(false);

          if (res.data.success) {
            props.handleLogin(true);
            localStorage.setItem("token",JSON.stringify(res.data.payload.token) )
            localStorage.setItem("user",JSON.stringify(res.data.payload.user) )
          }
          else{
            
            showtoast({
              title: "ERROR OCCURED",
              description: res.data.payload,
              status: "error",
              duration: 8000
          });
          }
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
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool
          </Text>
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
              <Input name='password' onChange={formik.handleChange} type="password" isRequired/>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>

              </Stack>
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
                Sign in
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