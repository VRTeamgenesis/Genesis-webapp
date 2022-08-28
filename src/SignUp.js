import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Highlight,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useCallback, useRef } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from './Utils/loginUtils';


function SignupCard() {

  const history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("unfold2022");
  const [email, setEmail] = useState('test@unfold2022.com');
  const [password, setPassword] = useState("unfawpeokwqepo");
  const emailRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);


  const onSignUp = useCallback(() => {
    if (!emailRef.current.validity.valid) {
      alert("Please enter a valid email id");
      return;
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(firebaseAuth, email, password).then(({ user }) => {
      user.getIdToken().then((idToken) => {
        console.log("IDTOKEN ", JSON.stringify({ idToken, userName: "" }));

        return fetch("https://40.113.171.199:8443/sessionSignup", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ idToken, userName: name }),
        }).then((resp) => {
          console.log(resp);
        }, () => {
          history("/listing");
        })
      }).then(() => {

        history("/listing");
      });
    }, (msg) => {
      alert('user already present, try sign in');
      history("/signin");
    })

  }, [password, email, history, name])
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
        <Box>
          <Highlight
          fontSize="18px"
            query='Intel SGX'
            styles={{ px: '2', py: '1', rounded: 'full', bg: 'red.100' }}
          >
            Your secrets are protected using Intel SGX confidential app
          </Highlight>
        </Box>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" value={name} onChange={(event) => {
                    setName(event.target.value);
                  }} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input ref={emailRef} type="email" value={email} onChange={(event) => {
                setEmail(event.target.value);
              }} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => {
                  setPassword(event.target.value);
                }} />
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

              <Button onClick={onSignUp}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                isLoading={isLoading}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>

            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?<RouterLink to='/signin'><Link color={'blue.400'}>Login</Link></RouterLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
export { SignupCard }