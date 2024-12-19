import { useEffect, useRef, useState } from "react";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Attempt from "../../components/Attempt/Attempt";
import TextScramble from "../../components/TextScramble/TextScramble";
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import GridLayout from "../../layouts/GridLayout/GridLayout";

import ApiManager from "../../api/ApiManager/ApiManager";
import { log, userData } from "three/webgpu";
import SlashFitTag from "../../components/SlashFitTag/SlashFitTag";

export default function Diary() {
  const api = new ApiManager();
  const [notes, setNotes] = useState([]);
  const namePhase = ["Nota uno", "Nota due", "Nota Tre", "Nota quattro", "Nota cinque",]

  useEffect(() => {
    api
      .get(`note`, {})
      .then((response) => {
        console.log(response);
        setNotes(response?.data?.notes);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (
    <BaseLayout>
      {window.innerWidth < 768 ? (
        <GridLayout>

          <div className="col-span-full col-span-md-6 flex justify-between">
          <div>
              {notes &&
                notes.map((note, index) => (
                  <div key={index}>
                    <SectionHeader  content={namePhase[index]} id={note.pk}  />
                    <TextScramble>
                      {note.description && note.description}
                    </TextScramble>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="mt-8"></div>

        </GridLayout>
      ) : (
        <GridLayout>
          <div className=" absolute bottom-0 mb-9 w-full flex justify-between mt-8">
              <span className="text-xs text-secondary uppercase">
                / Niente sarà più come prima.
              </span>

            </div>
          <div className="col-span-6 flex flex-col h-full sticky top-8 justify-between" >
            <div>
              {notes &&
                notes.map((note, index) => (
                  <SlashFitTag key={index} content={namePhase[index]}  id={note.pk} />
                ))
              }
            </div>
            
          </div>
          <div className="col-span-6 flex flex-col text-md h-fit mx-4 overflow-auto">
            <div>
              {notes &&
                notes.map((note, index) => (
                  <div key={index}>
                    <SectionHeader  content={namePhase[index]} id={note.pk}  />
                    <TextScramble>
                      {note.description && note.description}
                    </TextScramble>
                  </div>
                ))
              }
            </div>


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

          </div>

        </GridLayout>
      )}
    </BaseLayout>
  );
}
