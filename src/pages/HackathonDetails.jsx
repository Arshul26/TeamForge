import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Make sure you're importing your db instance correctly
import { doc, getDoc } from "firebase/firestore"; // Import getDoc and doc functions from firestore

const HackathonDetails = ({ id }) => {
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data based on the document ID passed in the route
    const fetchHackathonData = async () => {
      try {
        const docRef = doc(db, "hackathons", id); // Get the specific document by ID
        const docSnap = await getDoc(docRef); // Fetch the document

        if (docSnap.exists()) {
          setHackathon(docSnap.data()); // Set the data from Firestore into state
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      } finally {
        setLoading(false); // Set loading to false after the data is fetched
      }
    };

    fetchHackathonData();
  }, [id]); // Trigger when the component mounts or when id changes

  if (loading) {
    return <div>Loading details...</div>;
  }

  return (
    <div>
      <h2>Hackathon Details</h2>
      <p><strong>Name:</strong> {hackathon?.Name || "Not Available"}</p>
      <p><strong>Description:</strong> {hackathon?.Description || "Not Available"}</p>
      <p><strong>Date:</strong> {hackathon?.Date || "Not Available"}</p>
      <p><strong>Location:</strong> {hackathon?.Location || "Not Available"}</p>
      <p><strong>Prize:</strong> {hackathon?.Prize || "Not Available"}</p>
    </div>
  );
};

export default HackathonDetails;
