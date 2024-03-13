/* eslint-disable comma-dangle */
const express = require('express');
const logger = require('morgan');
const { initialize } = require('express-openapi');
const swaggerUi = require('swagger-ui-express');
const apiDoc = require('./api/api-doc');
const cors = require('cors');

const app = express();

app.listen(9090);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// OpenAPI routes
initialize({
  app,
  apiDoc,
  paths: './src/api/paths',
});

// OpenAPI UI
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: 'http://localhost:9090/api-docs',
    },
  })
);

console.log('App running on port http://localhost:9090');
console.log('OpenAPI documentation available in http://localhost:9090/docs');

module.exports = app;
