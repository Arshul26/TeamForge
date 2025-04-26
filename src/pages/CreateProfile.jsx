import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, VStack, Heading, Text, useToast } from '@chakra-ui/react';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Select from 'react-select';

export default function ProfileCreate() {
  const [bio, setBio] = useState('');
  const [hackathons, setHackathons] = useState('');
  const [techStack, setTechStack] = useState([]);
  const [username, setUsername] = useState('');
  const toast = useToast();
  const navigate = useNavigate(); // Initialize navigate

  const options = [
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Python', label: 'Python' },
    { value: 'CSS', label: 'CSS' },
    { value: 'HTML', label: 'HTML' },
    { value: 'AWS', label: 'AWS' },
    { value: 'Docker', label: 'Docker' },
    { value: 'Kubernetes', label: 'Kubernetes' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'PostgreSQL', label: 'PostgreSQL' },
    { value: 'GraphQL', label: 'GraphQL' },
    { value: 'Firebase', label: 'Firebase' },
    { value: 'GCP', label: 'GCP' },
    { value: 'Azure', label: 'Azure' },
    { value: 'Machine Learning', label: 'Machine Learning' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'TensorFlow', label: 'TensorFlow' },
    { value: 'Django', label: 'Django' },
    { value: 'Flask', label: 'Flask' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (auth.currentUser) { // Ensure the user is logged in
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await setDoc(userRef, {
          username,
          bio,
          techStack: techStack.map((skill) => skill.value),
          hackathons,
        });

        toast({
          title: 'Profile created successfully!',
          description: 'Your profile has been saved.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        navigate('/dashboard'); // Redirect to dashboard after profile creation
      } else {
        toast({
          title: 'Error',
          description: 'You must be logged in to create a profile.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an issue saving your profile.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} borderRadius="lg" bg="gray.50" boxShadow="xl" maxW="md" margin="0 auto" mt={10}>
      <VStack spacing={6} align="start">
        <Heading size="lg" color="teal.500" textAlign="center">
          Create Your Profile
        </Heading>

        <FormControl>
          <FormLabel htmlFor="username" fontSize="lg" fontWeight="bold">
            Username
          </FormLabel>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            size="lg"
            focusBorderColor="teal.500"
            bg="white"
            borderColor="teal.300"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="bio" fontSize="lg" fontWeight="bold">
            Bio
          </FormLabel>
          <Input
            id="bio"
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write a short bio about yourself..."
            size="lg"
            focusBorderColor="teal.500"
            bg="white"
            borderColor="teal.300"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="hackathons" fontSize="lg" fontWeight="bold">
            Hackathons (Past Participation)
          </FormLabel>
          <Input
            id="hackathons"
            type="text"
            value={hackathons}
            onChange={(e) => setHackathons(e.target.value)}
            placeholder="Mention past hackathons (optional)"
            size="lg"
            focusBorderColor="teal.500"
            bg="white"
            borderColor="teal.300"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="techStack" fontSize="lg" fontWeight="bold">
            Tech Stack (Skills)
          </FormLabel>
          <Select
            id="techStack"
            isMulti
            options={options}
            onChange={(selected) => setTechStack(selected)}
            value={techStack}
            placeholder="Select skills"
            styles={{
              control: (provided) => ({
                ...provided,
                borderColor: 'teal.300',
                boxShadow: 'none',
                '&:hover': { borderColor: 'teal.500' },
              }),
              multiValue: (provided) => ({
                ...provided,
                backgroundColor: 'teal.100',
                color: 'teal.800',
              }),
              multiValueLabel: (provided) => ({
                ...provided,
                color: 'teal.800',
              }),
            }}
          />
        </FormControl>

        <Button onClick={handleSubmit} colorScheme="teal" size="lg" width="full" _hover={{ bg: 'teal.600' }} mt={4}>
          Create Profile
        </Button>
      </VStack>
    </Box>
  );
}
