// src/pages/ProfileDashboard.jsx
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

import Navbar from '../components/Navbar';

const ProfileDashboard = () => {
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    
    if (auth.currentUser) {
      fetchUserProfile();
    }
  }, []);
  
  return (
    <>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h1>Profile Dashboard</h1>
        {userData ? (
          <div>
            <p><strong>Tech Stack:</strong> {userData.techStack}</p>
            <p><strong>Past Hackathons:</strong> {userData.hackathons}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default ProfileDashboard;
