
import {Routes, Route } from "react-router-dom";
import Landing from "./routes/Landing/Landing.jsx";
import Map from "./routes/Map/Map.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/map" element={<Map/>} />
      </Routes>
    </>
  );
}

export default App;
