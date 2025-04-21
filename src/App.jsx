import { Button, Box, Text, VStack } from '@chakra-ui/react';

function App() {
  return (
    <Box minH="100vh" display="flex" justifyContent="center" alignItems="center" bg="gray.50">
      <VStack spacing={4}>
        <Text fontSize="2xl" color="teal.500">🚀 HackLink with Chakra UI</Text>
        <Button colorScheme="teal">Let’s Go!</Button>
      </VStack>
    </Box>
  );
}

export default App;