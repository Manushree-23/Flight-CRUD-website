'use strict';

const { server_port, cors_origin, mongo_url } = require('./config');

global.server_port = server_port;
global.cors_origin = cors_origin;
global.mongo_url = mongo_url;

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

global.express = express;
global.cors = cors;
global.mongoose = mongoose;

const app = express();
global.app = app;

// Models
const AppModel = require('./model/AppModel');
global.AppModel = AppModel;

// Controllers
const AppController = require('./controller/AppController');
const FlightController = require('./controller/FlightController'); // Ensure correct import

global.appController = new AppController();
global.flightController = new FlightController(); 
const appModel = new AppModel();
global.appModel = appModel;

appController.connectToMongo();

const FlightModel = appModel.FlightModel();
global.FlightModel = FlightModel;

// Routes
const AppRoutes = require('./routes/AppRoutes');
global.AppRoutes = AppRoutes;

// Middlewares
app.use(cors(cors_origin));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes for API endpoints
const appRoutes = new AppRoutes();
appRoutes.root(appController);
appRoutes.flight(flightController); 

// Run the server
const PORT = global.server_port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
