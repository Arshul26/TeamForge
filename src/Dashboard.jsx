import { useEffect, useState } from 'react';
import { auth } from '../firebase'; // Import Firebase Auth
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { Box, Heading } from '@chakra-ui/react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/'); // If not authenticated, redirect to login page
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [navigate]);

  if (!user) {
    return <p>Loading...</p>; // Show loading while checking auth state
  }

  return (
    <Box p={8}>
      <Heading>Welcome to your Dashboard, {user.email}</Heading>
      {/* Your actual dashboard content goes here */}
    </Box>
  );
}
