import { useEffect, useRef, useState } from "react";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Attempt from "../../components/Attempt/Attempt";
import TextScramble from "../../components/TextScramble/TextScramble";
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import GridLayout from "../../layouts/GridLayout/GridLayout";
import "./Input.css";
import ApiManager from "../../api/ApiManager/ApiManager";
import { log } from "three/webgpu";

export default function Input() {
  const [canvasImages, setCanvasIamges] = useState([]);
  const [correctCodes, setCorrectCodes] = useState([]);

  useEffect(() => {
    api
      .get(`get-photos`, {})
      .then((response) => {
        console.log(response);
        setCanvasIamges(response?.data?.photos);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    api
      .get(`get-codes`, {})
      .then((response) => {
        console.log(response);
        setCorrectCodes(response?.data?.codes);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  const api = new ApiManager();

  const handleInputChange = (e) => {
    let valueString = e.target.value.toString();
    let len = valueString.length;

    if (len >= 7) {
      e.target.value = valueString.slice(0, 7);

      api
        .post("check-code", { code: valueString })
        .then((response) => {
          if (response.data?.messaggio) {
          }
        })
        .catch((error) => {
          console.error(error);
        });

      e.target.classList.add("text-red-500");
      setTimeout(() => {
        e.target.classList.remove("text-red-500");
        e.target.value = "";
      }, 500);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (window.innerWidth >= 768) {
      canvas.width = window.innerWidth * 0.2;
      canvas.height = window.innerWidth * 0.2;
    } else {
      canvas.width = window.innerWidth - 16 * 2;
      canvas.height = window.innerWidth - 16 * 2;
    }

    // Image positions (3x3 grid layout positions mapped to x, y coordinates)
    const positions = [
      { x: 0, y: 0 },
      { x: canvas.width / 3, y: 0 },
      { x: (canvas.width / 3) * 2, y: 0 },
      { x: 0, y: canvas.width / 3 },
      { x: canvas.width / 3, y: canvas.width / 3 },
      { x: (canvas.width / 3) * 2, y: canvas.width / 3 },
      { x: 0, y: (canvas.width / 3) * 2 },
      { x: canvas.width / 3, y: (canvas.width / 3) * 2 },
      { x: (canvas.width / 3) * 2, y: (canvas.width / 3) * 2 },
    ];

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Load and draw each image based on its position
    canvasImages.forEach((image) => {
      const img = new Image();
      img.src = image.url;
      img.onload = () => {
        const { x, y } = positions[image.position - 1];
        ctx.drawImage(img, x, y, canvas.width / 3, canvas.width / 3);
      };
    });
  }, [canvasImages]);

  return (
    <BaseLayout>
      {window.innerWidth < 768 ? (
        <GridLayout>
          <SectionHeader content="Scrivi" />
          <div className="col-span-full md:col-span-6 w-full relative mb-8">
            <input
              className="my-crop bg-bg w-full h-[58px] absolute top-1/2 left-1/2 -translate-x-[49.9%] sm:-translate-x-[49.92%] -translate-y-1/2 z-20 text-3xl px-4"
              type="number"
              onChange={(e) => handleInputChange(e)}
            />
            <div className="my-crop bg-white w-[calc(100%+1px)] sm:w-[calc(100%+2px)] h-[59px] z-10"></div>
          </div>
          <SectionHeader content="Tentativi" />
          <div className="flex justify-between">
            {/* Column 1: Display correct codes */}
            <div className="flex flex-col items-start">
              {correctCodes.slice(0, 5).map((code, index) => (
                <Attempt
                  key={index}
                  count={String(index).padStart(4, "0")}
                  code={code}
                  color="text-accent-success"
                />
              ))}
              {/* Fill with placeholders if fewer than 5 codes */}
              {Array.from({ length: 5 - correctCodes.slice(0, 5).length }).map(
                (_, index) => (
                  <Attempt key={`placeholder1-${index}`} />
                )
              )}
            </div>

            {/* Column 2: Display next set of correct codes */}
            <div className="flex flex-col items-center">
              {correctCodes.slice(5, 7).map((code, index) => (
                <Attempt
                  key={index + 5}
                  count={String(index + 5).padStart(4, "0")}
                  code={code}
                  color="text-accent-success"
                />
              ))}
              {/* Fill with placeholders if fewer than 2 codes */}
              {Array.from({ length: 2 - correctCodes.slice(5, 7).length }).map(
                (_, index) => (
                  <Attempt key={`placeholder2-${index}`} />
                )
              )}
            </div>

            {/* Column 3: Display last set of correct codes */}
            <div className="flex flex-col items-end">
              {correctCodes.slice(7, 9).map((code, index) => (
                <Attempt
                  key={index + 7}
                  count={String(index + 7).padStart(4, "0")}
                  code={code}
                  color="text-accent-success"
                />
              ))}
              {/* Fill with placeholders if fewer than 2 codes */}
              {Array.from({ length: 2 - correctCodes.slice(7, 9).length }).map(
                (_, index) => (
                  <Attempt key={`placeholder3-${index}`} />
                )
              )}
            </div>
          </div>

          <div className="mt-8"></div>
          <SectionHeader content="Code" />

          {/* Canvas for rendering images */}
          <div className="col-span-full md:col-span-6 mb-8">
            <canvas ref={canvasRef}></canvas>
          </div>

          <SectionHeader content="Quote" />
          <div className="col-span-full md:col-span-6 text-md h-fit">
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
              Inizio a leggere un articolo e mi viene in mente di avere già
              sentito questo nome: forse nelle vecchie storie di nonno? Torno
              subito a casa e inizio a cercare nella scatola che mi mostrava da
              piccolo... Finalmente la trovo. Sblocco la chiusura rivelando un
              vecchio album di famiglia, oggetti arruginiti e uno scrigno chiuso
              da un lucchetto. Guardando le foto mi tolgo ogni dubbio: era parte
              della mia famiglia!
            </TextScramble>
            <div className="mb-4"></div>

            <TextScramble>Ora voglio aprire questo scrigno.</TextScramble>
            <div className="mb-4"></div>
          </div>
        </GridLayout>
      ) : (
        <GridLayout>
          <div className="col-span-6 flex flex-col text-xl h-fit mx-4">
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
              Inizio a leggere un articolo e mi viene in mente di avere già
              sentito questo nome: forse nelle vecchie storie di nonno? Torno
              subito a casa e inizio a cercare nella scatola che mi mostrava da
              piccolo... Finalmente la trovo. Sblocco la chiusura rivelando un
              vecchio album di famiglia, oggetti arruginiti e uno scrigno chiuso
              da un lucchetto. Guardando le foto mi tolgo ogni dubbio: era parte
              della mia famiglia!
            </TextScramble>
            <div className="mb-4"></div>

            <TextScramble>Ora voglio aprire questo scrigno.</TextScramble>
            <div className="mb-4"></div>
          </div>
          <div className="col-span-6 flex flex-col">
            <SectionHeader content="Scrivi" />
            <div className="w-full relative mb-8">
              <input
                className="my-crop bg-bg w-full h-[58px] absolute top-1/2 left-1/2 -translate-x-[49.9%] sm:-translate-x-[49.92%] -translate-y-1/2 z-20 text-3xl px-4"
                type="number"
                onChange={(e) => handleInputChange(e)}
              />
              <div className="my-crop bg-white w-[calc(100%+1px)] sm:w-[calc(100%+2px)] h-[59px] z-10"></div>
            </div>
            <SectionHeader content="Attempts" />
            <div className="flex justify-between">
              {/* Column 1: Display correct codes */}
              <div className="flex flex-col items-start">
                {correctCodes.slice(0, 5).map((code, index) => (
                  <Attempt
                    key={index}
                    count={String(index).padStart(4, "0")}
                    code={code}
                    color="text-accent-success"
                  />
                ))}
                {/* Fill with placeholders if fewer than 5 codes */}
                {Array.from({
                  length: 5 - correctCodes.slice(0, 5).length,
                }).map((_, index) => (
                  <Attempt key={`placeholder1-${index}`} />
                ))}
              </div>

              {/* Column 2: Display next set of correct codes */}
              <div className="flex flex-col items-center">
                {correctCodes.slice(5, 7).map((code, index) => (
                  <Attempt
                    key={index + 5}
                    count={String(index + 5).padStart(4, "0")}
                    code={code}
                    color="text-accent-success"
                  />
                ))}
                {/* Fill with placeholders if fewer than 2 codes */}
                {Array.from({
                  length: 2 - correctCodes.slice(5, 7).length,
                }).map((_, index) => (
                  <Attempt key={`placeholder2-${index}`} />
                ))}
              </div>

              {/* Column 3: Display last set of correct codes */}
              <div className="flex flex-col items-end">
                {correctCodes.slice(7, 9).map((code, index) => (
                  <Attempt
                    key={index + 7}
                    count={String(index + 7).padStart(4, "0")}
                    code={code}
                    color="text-accent-success"
                  />
                ))}
                {/* Fill with placeholders if fewer than 2 codes */}
                {Array.from({
                  length: 2 - correctCodes.slice(7, 9).length,
                }).map((_, index) => (
                  <Attempt key={`placeholder3-${index}`} />
                ))}
              </div>
            </div>

            <div className="mt-8"></div>
            <SectionHeader content="Code" />

            <div className="mb-8">
              <canvas ref={canvasRef}></canvas>
            </div>
          </div>
        </GridLayout>
      )}
    </BaseLayout>
  );
}
