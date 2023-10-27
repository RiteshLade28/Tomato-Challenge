import React, { useCallback, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CardMedia,
} from "@material-ui/core";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Sector,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Paper,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import PendingIcon from "@mui/icons-material/Pending";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import apiClient from "../../apis/api-client";
// import urls from "../../apis/urls";
import Cookies from "js-cookie";

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

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF99E6",
  "#AF19FF",
  "#FFA919",
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Sales ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const Dashboard = () => {
  const classes = useStyles();
  //   const [totalOrders, setTotalOrders] = useState();
  //   const [totalRevenue, setTotalRevenue] = useState();
  //   const [totalCustomers, setTotalCustomers] = useState();
  //   const [pendingOrders, setPendingOrders] = useState();
  const [latestProducts, setLatestProducts] = useState([]);
  //   const [orders, setOrders] = useState([]);
  //   const [salesData, setSalesData] = useState([]);
  //   const [productData, setProductData] = useState([]);

  const tomatoData = [
    { month: "Jan", demand: 100, supply: 120 },
    { month: "Feb", demand: 110, supply: 130 },
    { month: "Mar", demand: 105, supply: 125 },
    { month: "Apr", demand: 115, supply: 135 },
    { month: "May", demand: 120, supply: 140 },
    { month: "Jun", demand: 150, supply: 110 }, // Increased demand, decreased supply
    { month: "Jul", demand: 155, supply: 105 }, // Increased demand, decreased supply
    { month: "Aug", demand: 140, supply: 160 },
    { month: "Sep", demand: 145, supply: 165 },
    { month: "Oct", demand: 150, supply: 170 },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const chartData = [
    { name: "Pune", value: 30 },
    { name: "Satara", value: 20 },
    { name: "Jaysingpur", value: 15 },
    { name: "Kolhapur", value: 35 },
  ];

  const formatDate = (date) => {
    console.log(date);
    const originalDate = new Date(date);
    const day = originalDate.getDate();
    const month = originalDate.getMonth() + 1; // Months are zero-indexed
    const year = originalDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Tomato Admin Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.summaryItem}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  <AllInclusiveIcon />
                </Avatar>
              }
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total APMC
              </Typography>
              <Typography variant="h4">4</Typography>
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
                Total Farmers
              </Typography>
              <Typography variant="h4">50</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.summaryItem}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  KG
                </Avatar>
              }
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Tomatoes
              </Typography>
              <Typography variant="h4">1200</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.summaryItem}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  KG
                </Avatar>
              }
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Demand
              </Typography>
              <Typography variant="h4">1000</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} className={classes.chartContainer}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ marginTop: "20px" }}
                  >
                    Monthly Tomato Demand and Supply (in KG)
                  </Typography>
                  <BarChart width={600} height={300} data={tomatoData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid stroke="#ccc" />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="demand"
                      fill="#FF0000"
                      barSize={20}
                      name="Demand"
                    />
                    <Bar
                      dataKey="supply"
                      fill="#097969"
                      barSize={20}
                      name="Supply"
                    />
                  </BarChart>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} className={classes.chartContainer}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ marginTop: "20px" }}
                  >
                    Tomatoes in APMC (in KG)
                  </Typography>
                  <PieChart width={600} height={300}>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={chartData}
                      cx={280}
                      cy={140}
                      innerRadius={70}
                      outerRadius={100}
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={entry.number}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.tableContainer}>
          <Paper style={{ padding: "20px" }}>
            <Typography variant="h6" className={classes.tableTitle}>
              Latest Products
            </Typography>
            {latestProducts?.map((product) => (
              <Card
                key={product.orderId}
                sx={{ fullWidth: 400, marginBottom: "10px" }}
              >
                <CardHeader
                  avatar={
                    <CardMedia
                      style={{
                        objectFit: "contain",
                        width: "60px",
                        height: "60px",
                      }}
                      component="img"
                      alt={product[0]}
                      src={product[1]}
                    />
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={product[0]}
                  subheader="September 14, 2016"
                />
              </Card>
            ))}
          </Paper>
        </Grid>
        {/* <Grid item xs={12} sm={8} className={classes.tableContainer}>
          <TableContainer component={Card} style={{ padding: "20px" }}>
            <Typography variant="h6" className={classes.tableTitle}>
              Recent Orders
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow key={order.orderId}>
                    <TableCell>{order[0]}</TableCell>
                    <TableCell>
                      {order[1]} {order[2]}
                    </TableCell>
                    <TableCell>{order[3]}</TableCell>
                    <TableCell>{formatDate(order[4])}</TableCell>
                    <TableCell>₹{order[5]}</TableCell>
                    <TableCell>{order[6]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default Dashboard;
