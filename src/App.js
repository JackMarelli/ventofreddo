
import { Routes, Route } from "react-router-dom";
import CountDown from "./routes/CountDown/CountDown.jsx";
import Input from "./routes/Input/Input.jsx";
import Map from "./routes/Map/Map.jsx";
import { useState } from "react";

function App() {
  const [fase, setFase] = useState("input");

  return (
    <>
      <Routes>
        {fase === "countdown1" && <Route path="/" element={<CountDown timer="23:15:04" quote="Qualcuno ha mai notato quanto strano sia il vento vicino al Naviglio, di notte? Oggi mi sembrava quasi che... parlasse. Non è un modo di dire, eh. Era un sibilo leggero, come un sospiro. Forse è solo suggestione, ma… qualcuno di voi lo ha mai sentito?" />} />}
        {fase === "input" && <Route path="/" element={<Input />} />}
        {fase === "countdown2" && <Route path="/" element={<CountDown timer="11:26:18" quote="QFinalmente sono riuscito ad aprire lo scrigno. Dentro trovo tutto il materiale che mio nonno aveva raccolto su Boggia.  Le coordinate mi hanno portato in un vicolo vicino alla Bagnera, il vecchio quartiere di Boggia. Non c’è quasi niente lì, tranne una lastra di metallo nascosta sotto un mattone, con inciso il numero 12. Non so cosa significhi, ma mentre ero lì... quel vento. Di nuovo. Più freddo. Più... presente" />} />}
      </Routes>
    </>
  );
}

export default App;
