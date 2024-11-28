import { makeNotLoggedInApiCaller } from "./BaseService";
class FlightsService {
  FLIGHTS_URL = "/flight";

  create = (newFlight) => {
    const apiCaller = makeNotLoggedInApiCaller();
    return apiCaller.post(`${this.FLIGHTS_URL}`, newFlight);
  }

  

  readAll = () => {
    const apiCaller = makeNotLoggedInApiCaller();
    return apiCaller.get(`${this.FLIGHTS_URL}`);
  }

  

  readOne = (id) => {
    const apiCaller = makeNotLoggedInApiCaller();
    return apiCaller.get(`${this.FLIGHTS_URL}/${id}`);
  }

  

  update = (id, updatedFlight) => {
    const apiCaller = makeNotLoggedInApiCaller();
    return apiCaller.put(`${this.FLIGHTS_URL}/${id}`, updatedFlight);
  }
  

  delete = (id) => {
    const apiCaller = makeNotLoggedInApiCaller();
    return apiCaller.delete(`${this.FLIGHTS_URL}/${id}`);
  }
  }


const flightsService = new FlightsService();
export default flightsService;
