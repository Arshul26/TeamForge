import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Heading, Text, VStack, Button, Spinner, Center } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion'; // Make sure you have this

const MotionBox = motion(Box); // <--- Here's the secret!

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
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
      {/* ✨ MotionBox for fade-in animation */}
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



// import React, { useEffect, useState } from 'react';
// import { db, auth } from '../firebase';
// import { doc, getDoc } from 'firebase/firestore';
// import { useNavigate, Link as RouterLink } from 'react-router-dom';
// import { Box, Heading, Text, VStack, Button, Spinner, Center } from '@chakra-ui/react';
// import Layout from '../components/Layout';
// import { motion } from 'framer-motion';

// export default function Dashboard() {
//   const [username, setUsername] = useState('');
//   const [loading, setLoading] = useState(true); // New state for loading
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const userRef = doc(db, 'users', auth.currentUser.uid);
//         const userDoc = await getDoc(userRef);
        
//         if (userDoc.exists()) {
//           setUsername(userDoc.data().username);
//         } else {
//           console.log('No user profile found!');
//           navigate('/create-profile');
//         }
//       } catch (error) {
//         console.error('Error fetching user profile: ', error);
//       } finally {
//         setLoading(false); // Set loading to false after fetching is done
//       }
//     };

//     fetchUserProfile();
//   }, [navigate]);

//   if (loading) {
//     // While loading, show a spinner centered
//     return (
//       <Layout>
//         <Center h="80vh">
//           <Spinner size="xl" color="teal.500" />
//         </Center>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <Box maxW="3xl" mx="auto" mt={10} p={6} bg="gray.50" rounded="xl" shadow="lg">
//         <VStack spacing={6} align="start">
//           <Heading size="xl" color="teal.500">
//             Welcome, {username ? username : 'User'}!
//           </Heading>
//           <Text fontSize="lg" color="gray.600">
//             Glad to have you onboard! 🎉
//           </Text>
//           <Text fontSize="md" color="gray.500">
//             Let's find the perfect hackathon for you 🚀
//           </Text>

//           {/* Bonus Explore Hackathons Button */}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             style={{ width: '100%' }}
//           >
//             <Button
//               as={RouterLink}
//               to="/hackathon-explorer"
//               colorScheme="teal"
//               size="lg"
//               width="full"
//               mt={4}
//               _hover={{ bg: 'teal.600' }}
//             >
//               Explore Hackathons
//             </Button>
//           </motion.div>
//         </VStack>
//       </Box>
//     </Layout>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import { db, auth } from '../firebase';
// import { doc, getDoc } from 'firebase/firestore';
// import { useNavigate, Link as RouterLink } from 'react-router-dom';
// import { Box, Heading, Text, VStack, Button } from '@chakra-ui/react';
// import Layout from '../components/Layout';
// import { motion } from 'framer-motion'; // make sure framer-motion is installed

// export default function Dashboard() {
//   const [username, setUsername] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const userRef = doc(db, 'users', auth.currentUser.uid);
//         const userDoc = await getDoc(userRef);
        
//         if (userDoc.exists()) {
//           setUsername(userDoc.data().username);
//         } else {
//           console.log('No user profile found!');
//           navigate('/create-profile');
//         }
//       } catch (error) {
//         console.error('Error fetching user profile: ', error);
//       }
//     };

//     fetchUserProfile();
//   }, [navigate]);

//   return (
//     <Layout>
//       <Box maxW="3xl" mx="auto" mt={10} p={6} bg="gray.50" rounded="xl" shadow="lg">
//         <VStack spacing={6} align="start">
//           <Heading size="xl" color="teal.500">
//             Welcome, {username ? username : 'User'}!
//           </Heading>
//           <Text fontSize="lg" color="gray.600">
//             Glad to have you onboard! 🎉
//           </Text>
//           <Text fontSize="md" color="gray.500">
//             Let's find the perfect hackathon for you 🚀
//           </Text>

//           {/* Bonus Explore Hackathons Button */}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             style={{ width: '100%' }}
//           >
//             <Button
//               as={RouterLink}
//               to="/hackathon-explorer"
//               colorScheme="teal"
//               size="lg"
//               width="full"
//               mt={4}
//               _hover={{ bg: 'teal.600' }}
//             >
//               Explore Hackathons
//             </Button>
//           </motion.div>
//         </VStack>
//       </Box>
//     </Layout>
//   );
// }
