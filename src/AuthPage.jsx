// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { auth } from './firebase'; // Firebase Auth
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Box, Input, Button, Heading, FormControl, FormLabel, Text } from '@chakra-ui/react';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle the login logic
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirect to the dashboard on successful login
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Box p={8}>
      <Heading mb={4}>Login</Heading>
      {error && <Text color="red.500" mb={4}>{error}</Text>}
      <FormControl mb={4}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormControl>
      <Button onClick={handleLogin}>Login</Button>
    </Box>
  );
}
