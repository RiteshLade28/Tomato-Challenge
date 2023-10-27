import React from "react";
import myImage from "../images/tomatochallenge.jpg"; // Import the image file
import image1 from "../images/Pic.jpg";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const Home = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const decodedToken = token && jwt_decode(token);
  console.log(decodedToken);
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
        <Card style={{ margin: "20px 0px" }}>
          <Card.Body className="d-flex flex-column align-items-center text-center">
            <Card.Title>Add Tomato Data</Card.Title>
            <Card.Text>To add tomato data, click on the button below</Card.Text>
            <Button
              onClick={() => {
                if (token === undefined) {
                  navigate("/login");
                } else {
                  navigate("/form");
                }
              }}
              variant="primary"
            >
              Add Data
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Home;
