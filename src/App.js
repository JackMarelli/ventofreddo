
import { Routes, Route } from "react-router-dom";
import CountDown from "./routes/CountDown/CountDown.jsx";
import Input from "./routes/Input/Input.jsx";
import Map from "./routes/Map/Map.jsx";
import { useState, useEffect } from "react";
import ApiManager from "./api/ApiManager/ApiManager.js";

function App() {
  const [fase, setFase] = useState("input");
  const api = new ApiManager();

  const FASI = {
    0: "countdown1",
    1: "input",
    2: "countdown2",
    3: "map",
    4: "",
  }

  useEffect(() => {
    api
      .get(`phase`, {})
      .then((response) => {
        console.log(response);
        setFase(FASI[response.data?.number])
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Routes>
        {/* Sequenza 1 */}
        {fase === "countdown1" && <Route path="/" element={<CountDown timer="23:15:04" quote="Qualcuno ha mai notato quanto strano sia il vento vicino al Naviglio, di notte? Oggi mi sembrava quasi che... parlasse. Non è un modo di dire, eh. Era un sibilo leggero, come un sospiro. Forse è solo suggestione, ma… qualcuno di voi lo ha mai sentito?" />} />}
        {fase === "input" && <Route path="/" element={<Input />} />}

        {/* Sequenza 2 */}
        {fase === "map" && <Route path="/" element={<Map />} />}
        {fase === "countdown2" && <Route path="/" element={<CountDown timer="11:26:18" quote="Finalmente sono riuscito ad aprire lo scrigno. Dentro trovo tutto il materiale che mio nonno aveva raccolto su Boggia.  Le coordinate mi hanno portato in un vicolo vicino alla Bagnera, il vecchio quartiere di Boggia. Non c’è quasi niente lì, tranne una lastra di metallo nascosta sotto un mattone, con inciso il numero 12. Non so cosa significhi, ma mentre ero lì... quel vento. Di nuovo. Più freddo. Più... presente" />} />}
      </Routes>
    </>
  );
}

export default App;
