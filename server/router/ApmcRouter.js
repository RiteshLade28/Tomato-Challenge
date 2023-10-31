const jwt = require("jsonwebtoken");
const express = require("express");
const apmcDataRouter = express.Router();
const GetApmcCount = require("../controllers/ApmcData/GetApmcCount");
const RequestTomato = require("../controllers/ApmcData/RequestTomato");
const GetApmcStocks = require("../controllers/ApmcData/GetApmcStocks");
const GetApmcRequest = require("../controllers/ApmcData/GetApmcRequest");
const GetVendorRequests = require("../controllers/ApmcData/GetVendorRequests");

apmcDataRouter.get("/list", GetApmcCount);
apmcDataRouter.post("/requestTomato", RequestTomato);
apmcDataRouter.get("/getTomatoStocks", GetApmcStocks);
apmcDataRouter.get("/apmc-requests", GetApmcRequest);

apmcDataRouter.get("/getVendorTomatoRequests", GetVendorRequests)

module.exports = apmcDataRouter;
