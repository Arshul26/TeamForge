import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Heading, Text, VStack, Button, Spinner, Center, Image } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const [profilePicURL, setProfilePicURL] = useState(''); // Correct variable name
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUsername(data.username);
          setProfilePicURL(data.profilePicURL || ''); // Set profilePicURL correctly
        } else {
          console.log('No user profile found!');
          navigate('/create-profile');
        }
      } catch (error) {
        console.error('Error fetching user profile: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return (
      <Layout>
        <Center h="80vh">
          <Spinner size="xl" color="teal.500" />
        </Center>
      </Layout>
    );
  }

  return (
    <Layout>
      <MotionBox
        maxW="3xl"
        mx="auto"
        mt={10}
        p={6}
        bg="gray.50"
        rounded="xl"
        shadow="lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <VStack spacing={6} align="start">
          {/* Display profile picture */}
          <Box display="flex" justifyContent="center" mb={4}>
            {profilePicURL ? (
              <Image
                borderRadius="full"
                boxSize="100px"
                src={profilePicURL} // Use the correct state variable here
                alt="Profile Picture"
                objectFit="cover"
              />
            ) : (
              <Box
                borderRadius="full"
                boxSize="100px"
                bg="gray.300"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text color="white" fontSize="xl">
                  {username ? username[0].toUpperCase() : 'U'}
                </Text> {/* Fallback initial */}
              </Box>
            )}
          </Box>

          <Heading size="xl" color="teal.500">
            Welcome, {username ? username : 'User'}!
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Glad to have you onboard! 🎉
          </Text>
          <Text fontSize="md" color="gray.500">
            Let's find the perfect hackathon for you 🚀
          </Text>

          {/* Explore Hackathons Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ width: '100%' }}
          >
            <Button
              as={RouterLink}
              to="/hackathon-explorer"
              colorScheme="teal"
              size="lg"
              width="full"
              mt={4}
              _hover={{ bg: 'teal.600' }}
            >
              Explore Hackathons
            </Button>
          </motion.div>
        </VStack>
      </MotionBox>
    </Layout>
  );
}

