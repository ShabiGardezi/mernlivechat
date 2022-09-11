import React from 'react'
import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Text, useColorModeValue,Link } from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useFormik } from "formik";
import axios from "axios"
import { Link as routerLink, useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'


export default function SignUp(props) {
    let navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isloading, setisloading] = useState(false)
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
            const name=values.fname+values.lname;

            axios.post(`http://localhost:5000/api/createuser`, {name, email, password })
                .then(res => {
                    // console.log(res.data);
                    setisloading(false);

                    if (res.data.success) 
                    {
                        navigate("/", { replace: true });
                        showtoast({
                            title: "ACCOUNT CREATED",
                            description: "You can login now",
                            status: "success",
                            duration: 5000
                        });
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