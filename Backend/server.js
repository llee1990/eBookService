const express = require("express");
const router = require('./routes/router.js');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "eBookServices API",
      version: "0.1.0",
      description:
        "This is a CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
      {
        url: "https://stark-wildwood-96064.herokuapp.com",
      },
    ],
    components: {        
      "securitySchemes": {
        "bearerAuth": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT"
        }
      }
    },
  },
  apis: ["./routes/router.js"],
};

const app = express();
const specs = swaggerJsdoc(options);

app.use(cors());

app.use(
  "/doc",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// parse requests of content-type - application/json
app.use(express.json({ limit: '5mb' }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.use('/api', router);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to eBookService backend with mySQL" });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});