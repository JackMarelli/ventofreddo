
import {Routes, Route } from "react-router-dom";
import Landing from "./routes/Landing/Landing.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing/>} />
      </Routes>
    </>
  );
}

export default App;
