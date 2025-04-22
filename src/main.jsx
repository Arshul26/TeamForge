import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from '../AuthPage';
import Dashboard from './Dashboard'; // Placeholder page

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
