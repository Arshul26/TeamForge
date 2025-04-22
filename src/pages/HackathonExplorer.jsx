// src/pages/HackathonExplorer.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import db from firebase.js
import { collection, getDocs } from 'firebase/firestore';
import { Box, Heading, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const HackathonExplorer = () => {
  const [hackathons, setHackathons] = useState([]); // Store hackathon data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'hackathons')); // Replace 'hackathons' with your Firestore collection name
        const hackathonList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHackathons(hackathonList);
      } catch (error) {
        console.error('Error fetching hackathons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []); // Empty array means this runs once when component mounts

  if (loading) {
    return <Box>Loading hackathons...</Box>;
  }

  return (
    <Box p={5}>
      <Heading mb={6}>Hackathon Explorer</Heading>
      <VStack spacing={4}>
        {hackathons.map((hackathon) => (
          <Box key={hackathon.id} borderWidth="1px" borderRadius="lg" p={4}>
            <Heading size="md">{hackathon.name}</Heading> {/* Change to appropriate field */}
            <p>{hackathon.description}</p> {/* Change to appropriate field */}
            <Link to={`/hackathon-details/${hackathon.id}`}>
              <Button colorScheme="teal" mt={4}>
                View Details
              </Button>
            </Link>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default HackathonExplorer;
