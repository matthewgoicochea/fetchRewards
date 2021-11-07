const express = require("express");
const app = express();
const cors = require("cors");

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");
const pointsRouter = require("./points/points.router");
const transactionsRouter = require("./transactions/transactions.router");

app.use(cors());
app.use(express.json());

app.use("/points", pointsRouter);
app.use("/transactions", transactionsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
