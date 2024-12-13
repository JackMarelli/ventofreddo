import React from "react";
import MapBox from "../../components/MapBox/MapBox";
import CityFog from "../../components/CityFog/CityFog";
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import GridLayout from "../../layouts/GridLayout/GridLayout";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import TextScramble from "../../components/TextScramble/TextScramble";

const Map = () => {
  return (
    <BaseLayout>
      {window.innerWidth < 768 ? (
        <div className="w-screen h-screen relative">
          <div className="w-full h-full absolute"></div>
          <MapBox className="fixed w-full h-screen" />
          <GridLayout></GridLayout>
        </div>
      ) : (
        <div className="w-screen h-screen flex">
          <div className="w-1/2 overflow-auto flex flex-col gap-x-2 md:gap-x-4 px-4 md:px-8 py-8">
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
          </div>
          <MapBox className="w-1/2 h-screen" />
        </div>
      )}
    </BaseLayout>
  );
};

export default Map;
