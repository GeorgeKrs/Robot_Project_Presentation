import { Routes, Route, Navigate } from "react-router";

import Header from "./components/header/index";

import Diagnostics from "./components/screens/Diagnostics";
import Robot_1 from "./components/screens/Robot_1";
import Robot_2 from "./components/screens/Robot_2";

function App() {
  return (
    <div className="bg-light">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to="/diagnostics" />} />
        <Route path="/diagnostics" element={<Diagnostics />} />
        <Route path="/robot1" element={<Robot_1 />} />
        <Route path="/robot2" element={<Robot_2 />} />
      </Routes>
    </div>
  );
}

export default App;
