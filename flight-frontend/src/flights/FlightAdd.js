import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoggedInHeader from "../header/LoggedInHeader";
import flightsService from '../services/FlightsService';

function FlightAdd() {
  const initFlight = {
    airline: "",
    source: "",
    destination: "",
    fare: "",
    duration: ""
  };
  const [flight, setFlight] = useState(initFlight);
  const navigate = useNavigate();

  const onTextChange = function(event){
    const changedFlight = { ...flight };
    changedFlight[event.target.id] = event.target.value;
    setFlight(changedFlight);
  };

  const doCreateFlight = async function(event){
    if (!window.confirm(`Are you sure to create the flight '${flight.airline}'?`)) {
      return;
    }

    const axiosResponse = flightsService.create({
      airline: flight.airline,
      source: flight.source,
      destination: flight.destination,
      fare: flight.fare,
      duration: flight.duration,
    });

    alert('Flight created successfully.');
    navigate("/flights/list");
    console.log(`${flight.airline}has been created successfully`);
  }

  return (
    <>
      <LoggedInHeader />
      <div>
        <a href="/flights/list" className="btn btn-light">&lt;&lt;Go Back</a>
        <h3>Add Flight</h3>
        <div className="container">
          <div className="form-group">
            <label htmlFor="airline">Airline</label>
            <input type="text" className="form-control" id="airline" placeholder="Enter airline"
              value={flight.airline} onChange={onTextChange} />
          </div>
          <div className="form-group">
            <label htmlFor="source">Source</label>
            <input type="text" className="form-control" id="source" placeholder="Enter source"
              value={flight.source} onChange={onTextChange} />
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input type="text" className="form-control" id="destination" placeholder="Enter destination"
              value={flight.destination} onChange={onTextChange} />
          </div>
          <div className="form-group">
            <label htmlFor="fare">Fare</label>
            <input type="number" className="form-control" id="fare" placeholder="Enter fare"
              value={flight.fare} onChange={onTextChange} />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input type="text" className="form-control" id="duration" placeholder="Enter duration"
              value={flight.duration} onChange={onTextChange} />
          </div>
          <button type="button" className="btn btn-success" onClick={doCreateFlight}>Create Flight</button>
        </div>
      </div>
    </>
  );
}

export default FlightAdd;
