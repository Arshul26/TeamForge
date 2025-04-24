// src/components/Navbar.jsx
import {
    Box,
    Flex,
    Button,
    useColorMode,
    useColorModeValue,
    Spacer,
    IconButton,
  } from '@chakra-ui/react';
  import { MoonIcon, SunIcon } from '@chakra-ui/icons';
  import { Link as RouterLink, useLocation } from 'react-router-dom';
  
  export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const location = useLocation();
    const bg = useColorModeValue('white', 'gray.900');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
  
    const navItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Hackathons', path: '/hackathon-explorer' },
        { name: 'Profile', path: '/profile' },
    ];
  
    return (
      <Flex
        as="nav"
        position="sticky"
        top="0"
        zIndex="1000"
        bg={bg}
        borderBottom="1px solid"
        borderColor={borderColor}
        p={4}
        align="center"
        boxShadow="md"
      >
        <Box fontWeight="bold" fontSize="xl">
          TeamForge
        </Box>
        <Spacer />
        <Flex gap={4}>
          {navItems.map(({ name, path }) => {
            const isActive = location.pathname === path;
            return (
                <Button
                key={name}
                as={RouterLink}
                to={path}
                variant="ghost"
                position="relative"
                color={isActive ? 'blue.400' : useColorModeValue('gray.800', 'gray.100')}
                _hover={{
                  textDecoration: 'none',
                  color: 'blue.500',
                }}
                _after={{
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  transform: 'scaleX(0)',
                  height: '2px',
                  bottom: 0,
                  left: 0,
                  backgroundColor: 'blue.400',
                  transformOrigin: 'bottom right',
                  transition: 'transform 0.3s ease-out',
                }}
                sx={{
                  '&:hover::after': {
                    transform: 'scaleX(1)',
                    transformOrigin: 'bottom left',
                  },
                }}
              >
                {name}
              </Button>              
            );
          })}
  
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
          />
        </Flex>
      </Flex>
    );
  }
  

// import React from 'react';
// import { Box, Flex, Link, Button, Spacer, useColorModeValue } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';

// export default function Navbar() {
//   const navigate = useNavigate();

  

//   return (
//     <Box bg={useColorModeValue('gray.100', 'gray.900')} px={6} py={3} shadow="md">
//       <Flex align="center">
//         <Box fontWeight="bold" fontSize="xl" color="blue.500" cursor="pointer" onClick={() => navigate('/dashboard')}>
//           TeamForge 🚀
//         </Box>
//         <Spacer />
//         <Flex gap={6}>
//           {navLinks.map((link) => (
//             <Link
//               key={link.label}
//               onClick={() => navigate(link.path)}
//               fontWeight="medium"
//               _hover={{ textDecoration: 'none', color: 'blue.400' }}
//               cursor="pointer"
//             >
//               {link.label}
//             </Link>
//           ))}
//           <Button colorScheme="red" variant="outline" size="sm" onClick={() => navigate('/')}>
//             Logout
//           </Button>
//         </Flex>
//       </Flex>
//     </Box>
//   );
// }


// const navLinks = [
//     { label: 'Dashboard', path: '/dashboard' },
//     { label: 'Hackathons', path: '/hackathon-explorer' },
//     { label: 'Profile', path: '/profile' },
//   ];