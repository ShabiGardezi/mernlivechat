<<<<<<< HEAD
 import React from 'react'
=======
import React from 'react'
>>>>>>> 7b41ae252efcd20fe6bf32f350a36250aec2a145
import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Text, useColorModeValue,Link,Center, Avatar ,AvatarBadge ,IconButton, } from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon,SmallCloseIcon } from '@chakra-ui/icons';
import { useFormik } from "formik";
import axios from "axios"
import { Link as routerLink, useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import constants from '../constants';
export default function SignUp(props) {
    let navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isloading, setisloading] = useState(false)
    const [pic, setpic] = useState()
    const toast = useToast();
    const [uploading, setuploading] = useState(false)
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
        initialValues: 
        {
            fname:"",
            lname:"",
            email: '',
            password: ""
        },
        onSubmit: (values) =>
         {
            
           
            setisloading(true);
            const email = values.email;
            const password = values.password;
            const name=values.fname+" "+values.lname;
            // axios.post(`http://localhost:5000/api/createuser`, {name, email, password,pic })
            axios
              .post(`${constants.baseUrl}/api/createuser`, {
                name,
                email,
                password,
                pic,
              })
              .then((res) => {
                setisloading(false);

                if (res.data.success) {
                  navigate("/", { replace: true });
                  showtoast({
                    title: "ACCOUNT CREATED",
                    description: "You can login now",
                    status: "success",
                    duration: 5000,
                  });
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
    const clickfileinput=()=>{
        document.getElementById("img").click();
    }
    const [location, setlocation] = useState()
    const [progress, setprogress] = useState(0);
   
const apiKey="142577837761974";
const cloudName="dld4hmoaj";
const filesubmit=async()=>{

  const file= document.getElementById("img").files[0]
  if(file.size>1000000)
  {
    // size is greater than 1mb error
    showtoast({
        title: "SIZE ERROR",
        description: " image size cannot be greater than 1mb",
        status: "error",
        duration: 5000
    });
    return
  }
  if(file.type!=="image/jpeg" && file.type!=="image/png" )
  {
    // format error
    showtoast({
        title: "FORMAT ERROR",
        description: "only JPEG and PNG are allowed",
        status: "error",
        duration: 5000
    });
    return 
  }
//   console.log(file);
//   console.log(URL.createObjectURL(file))
  setlocation(URL.createObjectURL(file))
  setuploading(true);
    const data=new FormData();
    data.append("file",document.getElementById("img").files[0]);
    data.append("api_key",apiKey);
    data.append("upload_preset","chat app")


    const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, data, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: function (e) {
      
        setprogress(Math.trunc((e.loaded / e.total)*100))
    }
  })
//   console.log(cloudinaryResponse)
  if(cloudinaryResponse.status==200){
      
      setpic({publicKey:cloudinaryResponse.data.public_id,
        url:cloudinaryResponse.data.url,
      })
      setuploading(false)
      setprogress(0);
  }
  else{
    setuploading(false)
    showtoast({
        title: "NETWORK ERROR OCCURED",
        description: "error while uploading image",
        status: "error",
        duration: 8000
    });
  }

}

    return (

        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
                
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                       
                    

          <Stack direction={['column', 'row']} spacing={6}>
            <Center >
               
              <Avatar id="avatar" size="xl" src={location} >
               
              </Avatar>
            </Center>
            <Center w="full">
                <Input display={"none"} id="img"  onInput={filesubmit} type={"file"} ></Input>

              <Button disabled={uploading} onClick={clickfileinput}  colorScheme={"red"} w="full">Upload profile image</Button>

             {uploading? <CircularProgress value={progress} color='green.400'>
  <CircularProgressLabel>{progress}</CircularProgressLabel>
</CircularProgress>:""}
            </Center>
          </Stack>





                       
                        <form onSubmit={formik.handleSubmit}>
                            <HStack>
                                <Box>

                                    <FormControl id="firstName" isRequired>
                                        <FormLabel>First Name</FormLabel>
                                        <Input name='fname' onChange={formik.handleChange} type="text" />
                                    </FormControl>

                                </Box>
                                <Box>
                                    <FormControl id="lastName" isRequired>
                                        <FormLabel>Last Name</FormLabel>
                                        <Input name='lname' onChange={formik.handleChange} type="text" />
                                    </FormControl>

                                </Box>

                            </HStack>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input name='email' onChange={formik.handleChange} type="email" />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input name='password' onChange={formik.handleChange} type={showPassword ? 'text' : 'password'} />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                disabled={uploading}
                                    loadingText="Creating Account"
                                    spinnerPlacement='end'
                                    isLoading={isloading ? true : false}
                                    size="lg"
                                    bg={'blue.400'}
                                    type="submit"
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <Link fontWeight="semibold" as={routerLink} to="/">Login </Link>
                                </Text>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}