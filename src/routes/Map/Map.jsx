import React, { useRef, useState } from "react";
import MapBox from "../../components/MapBox/MapBox";
import CityFog from "../../components/CityFog/CityFog";
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import GridLayout from "../../layouts/GridLayout/GridLayout";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import TextScramble from "../../components/TextScramble/TextScramble";
import ApiManager from "../../api/ApiManager/ApiManager";

const Map = () => {
  const [inputValue, setInputValue] = useState("");
  const inputBoxRef = useRef(null);
  const api = new ApiManager();

  const handleInputChange = (e) => {
    const value = e.target.value;
    const regex = /^\d{0,6}(\.\d{0,2})?$/; // Allows XXXXXX.XX format
    if (regex.test(value) || value === "") {
      setInputValue(value);
    }

    let valueString = value.toString();
    console.log(valueString);

    let len = valueString.length;

    if (len >= 9) {
      e.target.value = valueString.slice(0, 7);

      api
        .post("check-longitude", { code: valueString })
        .then((response) => {
          if (response.data?.message) {
            e.target.classList.add("!text-green-500");
            inputBoxRef.current.classList.add("!bg-green-500");
            setTimeout(() => {
              inputBoxRef.current.classList.remove("!bg-green-500");
              e.target.classList.remove("!text-green-500");
              e.target.value = "";
            }, 500);
          } else {
            e.target.classList.add("!text-red-500");
            inputBoxRef.current.classList.add("!bg-red-500");
            setTimeout(() => {
              inputBoxRef.current.classList.remove("!bg-red-500");
              e.target.classList.remove("!text-red-500");
              e.target.value = "";
            }, 500);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <BaseLayout>
      {window.innerWidth < 768 ? (
        <div className="w-screen h-screen relative overflow-hidden">
          <MapBox className="absolute h-screen start-0 end-0" />
          <div className="absolute top-0 bottom-0 start-0 end-0 overflow-auto flex flex-col gap-x-2 px-4 py-8 bg-transparent pointer-events-none">
            <div className="my-crop w-full relative bg-white h-16 pointer-events-auto">
              <div className="my-crop bg-bg absolute top-1/2 -translate-y-1/2 start-1/2 -translate-x-1/2 w-[calc(100%-3px)] h-[calc(100%-3px)] flex px-4 z-10 select-none">
                <input
                  ref={inputBoxRef}
                  className="text-xl text-start bg-bg w-1/2 placeholder:text-gray-400 select-none"
                  type="text"
                  value={inputValue}
                  placeholder="XXXXXX.XX"
                  onChange={handleInputChange}
                  maxLength={9}
                />
                <span className="text-xl flex items-center w-1/2 font-mono ml-2 bg-bg">
                  - 204815.55
                </span>
              </div>
            </div>
            <div className="absolute bottom-4 start-4 end-4">
              <div className="my-crop w-full relative bg-white h-48 pointer-events-auto">
                <div className="my-crop bg-bg absolute top-1/2 -translate-y-1/2 start-1/2 -translate-x-1/2 w-[calc(100%-3px)] h-[calc(100%-3px)] overflow-scroll p-4">
                  Ho trovato una fotocopia di un giornale vecchissimo del 1862,
                  l’anno in cui hanno impiccato il temuto serial killer Antonio
                  Boggia. Come ci è finita lì? Strano, no? <br />
                  Inizio a leggere un articolo e mi viene in mente di avere già
                  sentito questo nome: forse nelle vecchie storie di nonno?
                  Torno subito a casa e inizio a cercare nella scatola che mi
                  mostrava da piccolo... <br />
                  Finalmente la trovo. Sblocco la chiusura rivelando un vecchio
                  album di famiglia, oggetti arruginiti e uno scrigno chiuso da
                  un lucchetto. Guardando le foto mi tolgo ogni dubbio: era
                  parte della mia famiglia! <br /> Ora voglio aprire questo
                  scrigno.
                </div>
              </div>
              <div className="w-full flex grow justify-between items-end mt-8">
                <span className="text-xs text-secondary uppercase">
                  / Niente sarà più come prima.
                </span>
                <span className="text-xs text-secondary uppercase">
                  / Diario.
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen flex">
          <div className="w-1/2 overflow-auto flex flex-col gap-x-2 gap-x-4 px-8">
            <SectionHeader content="Sii Intelligente" />
            <div className="my-crop w-full relative bg-white h-16 pointer-events-auto">
              <div className="my-crop bg-bg absolute top-1/2 -translate-y-1/2 start-1/2 -translate-x-1/2 w-[calc(100%-3px)] h-[calc(100%-3px)] flex px-4 z-10 select-none">
                <input
                  ref={inputBoxRef}
                  className="text-xl text-start bg-bg w-1/2 placeholder:text-gray-400 select-none"
                  type="text"
                  value={inputValue}
                  placeholder="XXXXXX.XX"
                  onChange={handleInputChange}
                  maxLength={9}
                />
                <span className="text-xl flex items-center w-1/2 font-mono ml-2 bg-bg">
                  - 204815.55
                </span>
              </div>
            </div>
            <SectionHeader content="Nota" />
            <TextScramble>
              Ho trovato una fotocopia di un giornale vecchissimo del 1862,
              l’anno in cui hanno impiccato il temuto serial killer Antonio
              Boggia. Come ci è finita lì? Strano, no?
            </TextScramble>
            <div className="mb-4"></div>
            <TextScramble>
              Inizio a leggere un articolo e mi viene in mente di avere già
              sentito questo nome: forse nelle vecchie storie di nonno? Torno
              subito a casa e inizio a cercare nella scatola che mi mostrava da
              piccolo...
            </TextScramble>
            <div className="mb-4"></div>
            <TextScramble>
              Finalmente la trovo. Sblocco la chiusura rivelando un vecchio
              album di famiglia, oggetti arruginiti e uno scrigno chiuso da un
              lucchetto. Guardando le foto mi tolgo ogni dubbio: era parte della
              mia famiglia!
            </TextScramble>
            <div className="mb-4"></div>
            <img
              className="w-full my-5 h-0 !transition !duration-500 !delay-100 !ease-out"
              src="assets/images/paper.png"
              alt=""
            />
            <TextScramble>Ora voglio aprire questo scrigno.</TextScramble>
            <div className="w-full flex grow justify-between items-end amt-8">
              <span className="text-xs text-secondary uppercase">
                / Niente sarà più come prima.
              </span>
              <span className="text-xs text-secondary uppercase">
                / Diario.
              </span>
            </div>
          </div>
          <MapBox className="w-1/2 h-screen" />
        </div>
      )}
    </BaseLayout>
  );
};

export default Map;
