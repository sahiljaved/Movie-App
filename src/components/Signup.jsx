import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, useToast, Link as ChakraLink } from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = ( ) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const navigate = useNavigate();
  const toast = useToast();
  
  const handleSignup = () => {
    if ( !name || !email || !password) {
         toast({
          title: 'Something went wrong!',
          description: 'Please enter all credential.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return; 
      }
    const user = { name, email, password };
    localStorage.setItem('user', JSON.stringify(user));
    setName('');
    setEmail('');
    setPassword('');
    navigate('/login');
  };

  return (

    <Box
      height="100vh"
      backgroundImage="url('https://assets.nflxext.com/ffe/siteui/vlv3/701eec50-4b87-4dc0-9d00-b0f54025dc36/028e62d2-2a59-4fc3-adaa-a0756a0512b9/IN-en-20220905-popsignuptwoweeks-perspective_alpha_website_large.jpg')" // Set the background image
      backgroundSize="cover"
    //   margin="auto"
    //   position="relative" 
    >

   <Box
    width="100%"
    height="100%"
    backdropFilter="blur(3px)"
    paddingTop ="7%"
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
      // position="relative"
      // zIndex="1"
      boxShadow="lg"
    
    //   bg="white"
    >
      <Heading as="h2" mb="6" textAlign="center">
        Sign Up
      </Heading>

      <FormControl mb="4">
      <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          type="text"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

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

      <Button colorScheme="blue" width="full" mt="4" onClick={handleSignup}>
        Sign Up
      </Button>

      <Box mt="4" textAlign="center">
        <Link  to="/login">
        <ChakraLink  color="blue.500">
          Already have an account? Log In
        </ChakraLink>
        </Link>
      </Box>
    </Box>
    </Box>
    </Box>
  );
};

export default Signup;
