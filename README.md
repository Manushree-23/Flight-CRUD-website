# Flight Management System

A Node.js-based application for managing flight records using MongoDB. This project supports CRUD operations (Create, Read, Update, Delete) on flight data, making it easy to manage flight details like ID, airline, source, destination, fare, and duration.


## Features

- Add new flight records.
- Retrieve flight details by ID.
- Update flight information.
- Delete flight records.
- Modular architecture for scalability and maintainability.

├── db.js # MongoDB connection setup 
├── FlightModel.js # Mongoose schema for flight data 
├── flightController.js # CRUD operations for flight management 
├── app.js # Main application



## Installation

1. Clone the repository:
   git clone https://github.com/your-username/flight-management-system.git
   
2. Navigate to the project directory:
   cd flight-management-system
   
3. Install dependencies:
   npm install


 ## Usage
 
 1. Start the application:
    node app.js
2. Perform CRUD operations by calling functions in app.js
   i) Add new flight:
       createFlight({ id: 'FL123', airline: 'Air India', source: 'Delhi', destination: 'Mumbai', fare: 5000, duration: '2h 15m' });
   ii) Retrieve flight details:
       readFlightById('FL123');
   iii) Update flight details:
       updateFlightById('FL123', { fare: 5500 });
   iv) Delete a flight:
       deleteFlightById('FL123');


## Prerequisites
1. Node.js (v14 or later)
2. MongoDB (local or cloud)
