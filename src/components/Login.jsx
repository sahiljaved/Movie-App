import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, useToast, Link as ChakraLink } from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
const Login = ( ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate( )
  const toast = useToast( )
  const handleLogin = ( ) => {

    if (!email || !password) {
        toast({
         title: 'Error',
         description: 'Please enter both email and password correctly.',
         status: 'error',
         duration: 1000,
         isClosable: true,
       });
       return; 
     }
    // Retrieve the user object from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Check if the provided email and password match the stored credentials
    if (storedUser && storedUser.email === email && storedUser.password === password) {
     navigate("/dashboard")
    } else {
       toast({
         title: 'Something went wrong!',
         description: 'Invalid Credentials.',
         status: 'error',
         duration: 3000,
         isClosable: true,
       });
       return; 
    }
  };

  return (
    <Box
    height="100vh"
    backdropFilter="blur(4px)" 
    backgroundImage="url('https://assets.nflxext.com/ffe/siteui/vlv3/701eec50-4b87-4dc0-9d00-b0f54025dc36/028e62d2-2a59-4fc3-adaa-a0756a0512b9/IN-en-20220905-popsignuptwoweeks-perspective_alpha_website_large.jpg')" // Set the background image
    backgroundSize="cover"
    >
    <Box
     width="100%"
     height="100%"
     backdropFilter="blur(3px)"
     paddingTop ="10%"
    >
    <Box
       maxW={{ base: '300px', md: '400px' }}
       m="auto"
     //   mt="10%"
       mx="auto"
       p="6"
       bg="rgba(255, 255, 255, 0.8)" 
       borderWidth="1px"
       borderRadius="5%"
       position="relative"
       zIndex="1"
       boxShadow="lg"
      
    >
      <Heading as="h2" mb="6" textAlign="center" >
        Log In
      </Heading>

      <FormControl mb="4">
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl mb="4">
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <Button colorScheme="blue" width="full" mt="4" onClick={handleLogin}>
        Log In
      </Button>
      <Box mt="4" textAlign="center">
        <Link  to="/">
        <ChakraLink  color="blue.500">
          Do not have an account? Sign Up
        </ChakraLink>
        </Link>
      </Box>

    </Box>
    </Box>
    </Box>
  );
};

export default Login;