import { useState } from 'react';
import {
  Box, Button, Input, VStack, Heading, useToast,
} from '@chakra-ui/react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: 'Logged in successfully!', status: 'success', duration: 3000 });
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast({ title: 'Account created successfully!', status: 'success', duration: 3000 });
      }

      // Reset form and navigate
      setEmail('');
      setPassword('');
      navigate('/dashboard'); // or wherever you want to redirect
    } catch (error) {
      toast({
        title: 'Authentication Error',
        description: error.message || 'Something went wrong',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
      <Box p={8} bg="white" boxShadow="lg" borderRadius="xl" width="sm">
        <Heading mb={6} textAlign="center">{isLogin ? 'Login' : 'Sign Up'}</Heading>
        <VStack spacing={4}>
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button colorScheme="teal" width="full" onClick={handleAuth}>
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
          <Button variant="link" onClick={() => setIsLogin(!isLogin)} color="blue.500">
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
