
import './App.css';
import Reservation from"./components/Reservation";
import ReserveRoom from"./components/ReserveRoom";
import ChangingRoom from "./components/Changingroom";
import RoomSelector from "./components/RoomSelector";
import Addroom from "./components/Addroom";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
<Router>
  <Routes>
    <Route path="/" element={<Reservation />}> </Route>
    <Route path="/reserveroom/:id" element={<ReserveRoom />}> </Route>
    <Route path="/changingroom/:id" element={<ChangingRoom />}> </Route>
    <Route path="/roomselector" element={<RoomSelector />}> </Route>
    <Route path="/addroom" element={<Addroom />}> </Route>
  </Routes>
</Router>
  );
}

export default App;
