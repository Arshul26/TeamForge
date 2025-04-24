// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { Box, Heading, Button, VStack } from '@chakra-ui/react';

import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <Box p={8}>
        <Heading mb={6}>Welcome to your Dashboard, {user.email}</Heading>
        <VStack spacing={4}>
          <Button colorScheme="blue" onClick={() => navigate('/hackathon-explorer')}>
            Go to Hackathon Explorer
          </Button>
          <Button colorScheme="teal" onClick={() => navigate('/profile')}>
            Go to Profile
          </Button>
        </VStack>
      </Box>
    </>
  );
}
