import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { red } from "@mui/material/colors";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  Grid,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  CardMedia,
} from "@material-ui/core";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Paper,
} from "@mui/material";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "20px 100px",
    padding: "20px",
  },
  summaryItem: {
    border: "1px solid #ccc",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
  },
  tableContainer: {
    marginTop: theme.spacing(1),
  },
  chartContainer: {
    marginTop: theme.spacing(1),
  },
  summaryItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    height: "160px",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
const DataDisplay = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0]; // Extract and format the date
    return formattedDate;
  };

  const token = Cookies.get("token");
  const decodedToken = jwt_decode(token);
  const apmcName = decodedToken.apmc.name;
  // console.log(apmcName);

  useEffect(() => {
    try {
      fetch(`/api/tomatoData/get-tomato-data?selectedOption=${apmcName}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token here
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((jsonData) => {
          console.log("jsonData", jsonData);
          setData(jsonData);
        })
        .catch((error) => {
          console.error("Error fetching or processing data: " + error);
        });
    } catch (error) {
      console.error("Error in the fetch request: " + error);
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/get-tomato-data?selectedOption=${apmcName}`
      );

      if (response.ok) {
        const jsonData = await response.json();

        // Format the date field in the fetched data
        const formattedData = jsonData.map((item) => ({
          ...item,
          todaydate: formatDateString(item.todaydate),
        }));
        setData(formattedData);
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to the backend to delete the data
      const response = await fetch(`/api/tomatoData/delete-tomato/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted item from the data displayed in the frontend
        const updatedData = data.filter((item) => item._id !== id);
        setData(updatedData);
        console.log("Data deleted successfully");
        toast.success("Data deleted successfully");
      } else {
        console.error("Error deleting data");
        toast.error("Error deleting data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating verification status");
    }
  };

  let serialNo = 1;
  return (
    <>
      <div style={{ margin: "30px 100px" }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              {apmcName} Dashboard
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.summaryItem}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    Σ
                  </Avatar>
                }
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Supply
                </Typography>
                <Typography variant="h4">15</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.summaryItem}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    <PeopleAltIcon />
                  </Avatar>
                }
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Demand
                </Typography>
                <Typography variant="h4">40</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.summaryItem}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    Σ
                  </Avatar>
                }
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Farmers
                </Typography>
                <Typography variant="h4">1000</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.summaryItem}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    q
                  </Avatar>
                }
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Transactions
                </Typography>
                <Typography variant="h4">65</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <div style={{ marginTop: "20px" }}>
          <h3>Tomato Data for {apmcName}</h3>
          <div className="table-responsive">
            <div></div>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Serial No</th>
                  <th>Farmer Name</th>
                  <th>Contact</th>
                  <th>Date</th>
                  {/* <th>Time</th> */}
                  <th>Weight</th>
                  <th>Trade Price</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.apmcMarket._id}>
                    <td>{serialNo++}</td>
                    <td>{item.farmer.name}</td>
                    <td>{item.farmer.phone}</td>
                    <td>{new Date(item.date).toISOString().split("T")[0]}</td>
                    {/* <td>{item.currentTime}</td> */}
                    <td>{item.weight}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default DataDisplay;
