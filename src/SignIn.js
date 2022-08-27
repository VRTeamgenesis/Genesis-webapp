
import React, { useCallback, useRef, useState } from "react";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Link,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import {  signInWithEmailAndPassword } from "firebase/auth";

import {Link as RouterLink, useNavigate} from 'react-router-dom'
import { firebaseAuth } from "./Utils/loginUtils";


function SignIn() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const emailRef =useRef();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSignIn = useCallback(()=>{
    if(!emailRef.current.validity.valid){
      alert("Please check the email id, format may be wrong");
    }else{
      setIsLoading(true);
      signInWithEmailAndPassword(firebaseAuth, email,password).then((user)=>{
        navigate('/listing');
      });
    }
  },[email,password,firebaseAuth]);
  
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
                to enjoy all of our cool features✌️
              </Text>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" ref={emailRef} value={email} onChange={(event)=>{
                      setEmail(event.target.value);
                  }}/>
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password"  value={password} onChange={(event)=>{
                      setPassword(event.target.value);
                  }}/>
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Checkbox>Remember me</Checkbox>
                    <RouterLink to='/signup'><Link>Create account</Link></RouterLink>
                  </Stack>
                  <Button
                  onClick={onSignIn}
                  isLoading={isLoading}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
       
      );
    
                  }

export {SignIn}
