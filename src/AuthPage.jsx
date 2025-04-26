import React, { useState } from 'react';
import { auth, db } from './firebase'; // Firebase Auth and Firestore
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Box, Input, Button, Heading, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { doc, setDoc } from 'firebase/firestore';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/dashboard'); // Go to dashboard on success
      } else {
        // Sign up with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // After successful sign up, redirect to the Create Profile page
        navigate('/create-profile'); // Redirect to ProfileCreate page to complete profile
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box p={8} maxW="400px" mx="auto" mt="10">
      <Heading mb={6} textAlign="center">
        {isLogin ? 'Login' : 'Sign Up'}
      </Heading>
      {error && <Text color="red.500" mb={4}>{error}</Text>}

      {/* Email Input */}
      <FormControl mb={4}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormControl>

      {/* Password Input */}
      <FormControl mb={4}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormControl>

      <Button onClick={handleAuth} width="100%" colorScheme="teal" mb={4}>
        {isLogin ? 'Login' : 'Sign Up'}
      </Button>

      {/* Toggle between Login and Sign Up */}
      <Text textAlign="center">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
        <Button
          variant="link"
          colorScheme="blue"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </Button>
      </Text>
    </Box>
  );
}
