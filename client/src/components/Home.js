import React from "react";
import myImage from "../images/tomatochallenge.jpg"; // Import the image file
import image1 from "../images/Pic.jpg";

const Home = () => {
  // Sample data for the cards
  const cardData = [
    {
      name: "Khushal Malu",
      imageSrc: image1,
    },
    {
      name: "Atharva Patil",
      imageSrc: "path_to_image2.jpg",
    },
    {
      name: "Ritesh Lade",
      imageSrc: "path_to_image3.jpg",
    },
    {
      name: "Dr. R. N. Bhimanpallewar",
      imageSrc: "path_to_image3.jpg",
    },
  ];

  return (
    <div className="container">
      <div className="image-container mt-4">
        <img src={myImage} alt="My Image" className="img-fluid" />
      </div>
    </div>
  );
};

export default Home;
