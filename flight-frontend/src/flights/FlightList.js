import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInHeader from "../header/LoggedInHeader";
import flightsService from "../services/FlightsService";

function FlightList() {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  const callToReadAllFlights = async function() {
    let axiosResponse;
  
    try {
      console.log("Hi......");
      axiosResponse = await flightsService.readAll();
      
      const json = axiosResponse.data;
      console.log("Hi......"+json);
      if (json.isError) {
        alert(`Error: ${json.data.message}`);
        return;
      }
  
      setFlights(json.data);  // Assuming flights data is in the 'data' field
    } catch (error) {
      console.error('Error during API call:', error);
      alert(`Server Error: ${error.message || 'Unknown error'}`);
    }
  };
  

  useEffect(() => {
    callToReadAllFlights();
  }, []);

  const deleteFlight = async function(flight) {
    if (!window.confirm(`Are you sure to delete the flight '${flight.airline}'?`)) {
      return;
    }

    const axiosResponse = await flightsService.delete(flight._id);
    const json = axiosResponse.data;

    alert(json.data.message);
    console.log(`${flight.airline} has been deleted successfully`);

    callToReadAllFlights();
  };

  return (
    <>
      <LoggedInHeader />
      <div className="container">
        <h3>Flights List</h3>
        <a href="/flights/add" className="btn btn-success">Add Flight</a>
        <table className="table table-stripped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Airline</th>
              <th scope="col">Source</th>
              <th scope="col">Destination</th>
              <th scope="col">Fare</th>
              <th scope="col">Duration</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight._id}>
                <th scope="row">{flight._id}</th>
                <td>{flight.airline}</td>
                <td>{flight.source}</td>
                <td>{flight.destination}</td>
                <td>{flight.fare}</td>
                <td>{flight.duration}</td>
                <td>
                  <a href={`/flights/edit/${flight._id}`} className="btn btn-warning">Edit</a>&nbsp;&nbsp;
                  <button className="btn btn-danger" onClick={() => deleteFlight(flight)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FlightList;
