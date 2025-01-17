import { Routes, Route } from "react-router-dom";
import CountDown from "./routes/CountDown/CountDown.jsx";
import Input from "./routes/Input/Input.jsx";
import Map from "./routes/Map/Map.jsx";
import { useState, useEffect } from "react";
import ApiManager from "./api/ApiManager/ApiManager.js";
import Diary from "./routes/Diary/Diary.jsx";

function App() {
  const [fase, setFase] = useState("map");
  const [isQrComplete, setQrComplete] = useState(false);
  const [endDateTime, setEndDateTime] = useState(""); // State to store countdown end time
  const api = new ApiManager();

  const FASI = {
    1: "countdown1",
    2: "input",
    3: "countdown2",
    4: "map",
    5: "countdown3",
  };

  // Fetch phase
  useEffect(() => {
    api
      .get(`phase`, {})
      .then((response) => {
        console.log("phase:", response);
        setFase(FASI[response.data?.phase] || "countdown1");
      })
      .catch((error) => {
        console.error("Error fetching phase:", error);
      });
  }, []);

  useEffect(() => {
    if (fase === "countdown1" || fase === "countdown2" || fase === "countdown3") {
      api
        .get(`countdown`, {})
        .then((response) => {
          console.log("countdown:", response);

          const { date, time } = response.data;
          if (date && time) {
            const combinedDateTime = `${date}T${time}`; // ISO format
            setEndDateTime(combinedDateTime);
          } else {
            console.error("Invalid countdown data:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching countdown:", error);
        });
    }
  }, [fase]);

  return (
    <>
      <Routes>

        <Route path="/diario" element={<Diary />} />

        {/* Sequenza 1 */}
        {fase === "countdown1" && (
          <Route
            path="/"
            element={
              <CountDown
                endDateTime={endDateTime}
                quote="Qualcuno ha mai notato quanto strano sia il vento vicino al Naviglio, di notte? Oggi mi sembrava quasi che... parlasse. Non è un modo di dire, eh. Era un sibilo leggero, come un sospiro. Forse è solo suggestione, ma… qualcuno di voi lo ha mai sentito?"
              />
            }
          />
        )}
        {fase === "input" && <Route path="/" element={<Input />} />}

        {/* Sequenza 2 */}
        {fase === "map" && <Route path="/" element={<Map />} />}
        {fase === "countdown2" && (
          <Route
            path="/"
            element={
              <CountDown
                endDateTime={endDateTime}
                quote="Finalmente sono riuscito ad aprire lo scrigno. Dentro trovo tutto il materiale che mio nonno aveva raccolto su Boggia. Tra i documenti, vedo qualcosa di inquietante: una lettera manoscritta, firmata da una donna di nome Elena, datata pochi giorni prima della sua misteriosa scomparsa. Elena... Questo nome mi suona familiare. Continuando a cercare, trovo una mappa: “I luoghi di Boggia"
              />
            }
          />
        )}
        {fase === "countdown3" && (
          <Route
            path="/"
            element={
              <CountDown
                endDateTime={endDateTime}
                quote="Sono arrivato al terzo luogo. Le mie mani tremano mentre mi avvicino al sottopasso. Le storie di mio nonno mi tornano in mente: l’ultima volta che quella donna, Elena, è stata vista è stata qui, durante una sera tempestosa.
Una fitta mi colpisce allo stomaco. Capisco che mio nonno sapeva tutto, ma ha scelto di tenermi lontano dalla verità. "
              />
            }
          />
        )}
      </Routes>
    </>
  );
}

export default App;
