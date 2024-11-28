import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import FlightList from "./flights/FlightList";
import FlightAdd from "./flights/FlightAdd";
import FlightEdit from "./flights/FlightEdit";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FlightList />} />
          <Route path="/flights/list" element={<FlightList />} />
          <Route path="/flights/add" element={<FlightAdd />} />
          <Route path="/flights/edit/:id" element={<FlightEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

