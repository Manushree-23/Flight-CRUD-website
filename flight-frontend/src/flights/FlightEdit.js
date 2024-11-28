import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoggedInHeader from "../header/LoggedInHeader";
import flightsService from '../services/FlightsService';

function FlightEdit() {
  const initFlight = {
    airline: "",
    source: "",
    destination: "",
    fare: "",
    duration: ""
  };

  const [flight, setFlight] = useState(initFlight);
  const params = useParams();
  const navigate = useNavigate();

  const callToReadFlightById = async function () {
    const axiosResponse = await flightsService.readOne(params.id);
    const json = axiosResponse.data;
    setFlight(json.data);
  };

  useEffect(() => {
    callToReadFlightById();
  }, [params.id]);

  const onTextChange = (event) => {
    const changedFlight = { ...flight };
    changedFlight[event.target.id] = event.target.value;
    setFlight(changedFlight);
  };

  const doUpdateFlight = async () => {
    if (!window.confirm(`Are you sure to update the flight '${flight.airline}'?`)) {
      return;
    }

    try {
      await flightsService.update(params.id, {
        airline: flight.airline,
        source: flight.source,
        destination: flight.destination,
        fare: flight.fare,
        duration: flight.duration
      });

      alert('Flight updated successfully.');
      navigate("/flights/list");
      console.log(`${flight.airline} has been updated successfully.`);
    } catch (error) {
      console.error("Error updating flight:", error);
      alert("Failed to update flight. Please try again.");
    }
  };

  return (
    <>
      <LoggedInHeader />
      <div>
        <a href="/flights/list" className="btn btn-light">&lt;&lt;Go Back</a>
        <h3>Edit Flight</h3>
        <div className="container">
          <div className="form-group">
            <label htmlFor="airline">Airline</label>
            <input
              type="text"
              className="form-control"
              id="airline"
              aria-describedby="airlineHelp"
              placeholder="Enter airline"
              value={flight.airline}
              onChange={onTextChange}
            />
            <small id="airlineHelp" className="form-text text-muted">Please enter airline.</small>
          </div>
          <div className="form-group">
            <label htmlFor="source">Source</label>
            <input
              type="text"
              className="form-control"
              id="source"
              aria-describedby="sourceHelp"
              placeholder="Enter source"
              value={flight.source}
              onChange={onTextChange}
            />
            <small id="sourceHelp" className="form-text text-muted">Please enter source.</small>
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              className="form-control"
              id="destination"
              aria-describedby="destinationHelp"
              placeholder="Enter destination"
              value={flight.destination}
              onChange={onTextChange}
            />
            <small id="destinationHelp" className="form-text text-muted">Please enter destination.</small>
          </div>
          <div className="form-group">
            <label htmlFor="fare">Fare</label>
            <input
              type="number"
              className="form-control"
              id="fare"
              aria-describedby="fareHelp"
              placeholder="Enter fare"
              value={flight.fare}
              onChange={onTextChange}
            />
            <small id="fareHelp" className="form-text text-muted">Please enter fare.</small>
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              className="form-control"
              id="duration"
              aria-describedby="durationHelp"
              placeholder="Enter duration"
              value={flight.duration}
              onChange={onTextChange}
            />
            <small id="durationHelp" className="form-text text-muted">Please enter duration.</small>
          </div>
          <button type="button" className="btn btn-warning" onClick={doUpdateFlight}>
            Update Flight
          </button>
        </div>
      </div>
    </>
  );
}

export default FlightEdit;
