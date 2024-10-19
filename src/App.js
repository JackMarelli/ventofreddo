
import { Routes, Route } from "react-router-dom";
import CountDown from "./routes/CountDown/CountDown.jsx";
import Input from "./routes/Input/Input.jsx";
import Map from "./routes/Map/Map.jsx";
import { useState } from "react";

function App() {
  const [fase, setFase] = useState("countdown1");

  return (
    <>
      <Routes>
        {fase === "countdown1" && <Route path="/" element={<CountDown timer="23:15:04" quote="Qualcuno ha mai notato quanto strano sia il vento vicino al
            Naviglio, di notte? Oggi mi sembrava quasi che... parlasse. Non è un
            modo di dire, eh. Era un sibilo leggero, come un sospiro. Forse è
            solo suggestione, ma… qualcuno di voi lo ha mai sentito?" />} />}
        {fase === "input" && <Route path="/" element={<Input />} />}
      </Routes>
    </>
  );
}

export default App;
