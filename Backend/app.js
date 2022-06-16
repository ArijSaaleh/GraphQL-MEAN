const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var connectDB = require("./config/dbconnection");

const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");

const app = express();
connectDB();

app.use(bodyParser.json());
app.use(cors());

app.listen(8000, console.log("connected to port 8000"));

//graphql middleware
app.use("/graphql", graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);

module.exports = app;
