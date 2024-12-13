import { useEffect, useRef, useState } from "react";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Attempt from "../../components/Attempt/Attempt";
import TextScramble from "../../components/TextScramble/TextScramble";
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import GridLayout from "../../layouts/GridLayout/GridLayout";
import "./Input.css";
import ApiManager from "../../api/ApiManager/ApiManager";
import { log, userData } from "three/webgpu";

export default function Input() {
  const [canvasImages, setCanvasIamges] = useState([]);
  const [correctCodes, setCorrectCodes] = useState([]);
  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  const inputBoxRef = useRef(null);
  const imageRef = useRef(null);
  const api = new ApiManager();

  const printTextImages = () => {
    imageRef.current.classList.add("!h-fit");
  };

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

  const handleInputChange = (e) => {
    let valueString = e.target.value.toString();
    let len = valueString.length;

    if (len >= 7) {
      e.target.value = valueString.slice(0, 7);

      api
        .post("check-code", { code: valueString })
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

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (window.innerWidth >= 768) {
      canvas.width = Math.min(window.innerWidth * 0.2, 260);
      canvas.height = Math.min(window.innerWidth * 0.2, 260);
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
          <div className="col-span-full md:col-span-6 w-full relative mb-8 select-none">
            <input
              className="my-crop bg-bg w-full h-[58px] absolute top-1/2 left-1/2 -translate-x-[49.9%] sm:-translate-x-[49.92%] -translate-y-1/2 z-20 text-3xl px-4"
              type="number"
              onChange={(e) => handleInputChange(e)}
            />
            <div
              ref={inputBoxRef}
              className="my-crop bg-white w-[calc(100%+1px)] sm:w-[calc(100%+2px)] h-[59px] z-10"
            ></div>
          </div>
          <SectionHeader content="Tentativi" />
          <div className="col-span-full col-span-md-6 flex justify-between">
            {/* Column 1: Always show 5 codes */}
            <div className="flex flex-col items-start">
              {correctCodes.slice(0, 5).map((code, index) => (
                <Attempt
                  key={index}
                  count={String(index).padStart(4, "0")}
                  code={code}
                  color="text-accent-success"
                />
              ))}
              {Array.from({ length: 5 - correctCodes.slice(0, 5).length }).map(
                (_, index) => (
                  <Attempt key={`placeholder1-${index}`} />
                )
              )}
            </div>

            {/* Column 2: Always show 5 codes */}
            <div className="flex flex-col items-center">
              {correctCodes.slice(5, 10).map((code, index) => (
                <Attempt
                  key={index + 5}
                  count={String(index + 5).padStart(4, "0")}
                  code={code}
                  color="text-accent-success"
                />
              ))}
              {Array.from({ length: 5 - correctCodes.slice(5, 10).length }).map(
                (_, index) => (
                  <Attempt key={`placeholder2-${index}`} />
                )
              )}
            </div>

            {/* Column 3: Always show 5 codes */}
            <div className="flex flex-col items-end">
              {correctCodes.slice(10, 15).map((code, index) => (
                <Attempt
                  key={index + 10}
                  count={String(index + 10).padStart(4, "0")}
                  code={code}
                  color="text-accent-success"
                />
              ))}
              {Array.from({
                length: 5 - correctCodes.slice(10, 15).length,
              }).map((_, index) => (
                <Attempt key={`placeholder3-${index}`} />
              ))}
            </div>
          </div>

          <div className="mt-8"></div>
          <SectionHeader content="Code" />

          {/* Canvas for rendering images */}
          <div className="col-span-full md:col-span-6 mb-8">
            <canvas ref={canvasRef}></canvas>
          </div>

          <SectionHeader content="Nota" />
          <div></div>
        </GridLayout>
      ) : (
        <GridLayout>
          <div className="col-span-6 flex flex-col text-md h-fit mx-4 overflow-auto">
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
            <TextScramble onEnd={() => printTextImages()}>
              Finalmente la trovo. Sblocco la chiusura rivelando un vecchio
              album di famiglia, oggetti arruginiti e uno scrigno chiuso da un
              lucchetto. Guardando le foto mi tolgo ogni dubbio: era parte della
              mia famiglia!
            </TextScramble>
            <div className="mb-4"></div>
            <img
              ref={imageRef}
              className="w-full my-5 h-0 !transition !duration-500 !delay-100 !ease-out"
              src="assets/images/paper.png"
              alt=""
            />

            <TextScramble>Ora voglio aprire questo scrigno.</TextScramble>
            <div className="mb-4"></div>
          </div>
          <div className="col-span-6 flex flex-col h-fit sticky top-8">
            <SectionHeader content="Scrivi" />
            <div className="relative mb-8 select-none">
              <input
                className="my-crop bg-bg w-full h-[58px] absolute top-1/2 left-1/2 -translate-x-[49.9%] sm:-translate-x-[49.92%] -translate-y-1/2 z-20 text-3xl px-4"
                type="number"
                onChange={(e) => handleInputChange(e)}
              />
              <div
                ref={inputBoxRef}
                className="my-crop bg-white w-[calc(100%+1px)] sm:w-[calc(100%+2px)] h-[59px] z-10"
              ></div>
            </div>
            <SectionHeader content="Attempts" />
            <div className="flex justify-between">
              {/* Column 1: Always show 5 codes */}
              <div className="flex flex-col items-start">
                {correctCodes.slice(0, 5).map((code, index) => (
                  <Attempt
                    key={index}
                    count={String(index).padStart(4, "0")}
                    code={code}
                    color="text-accent-success"
                  />
                ))}
                {Array.from({
                  length: 5 - correctCodes.slice(0, 5).length,
                }).map((_, index) => (
                  <Attempt key={`placeholder1-${index}`} />
                ))}
              </div>

              {/* Column 2: Always show 5 codes */}
              <div className="flex flex-col items-center">
                {correctCodes.slice(5, 10).map((code, index) => (
                  <Attempt
                    key={index + 5}
                    count={String(index + 5).padStart(4, "0")}
                    code={code}
                    color="text-accent-success"
                  />
                ))}
                {Array.from({
                  length: 5 - correctCodes.slice(5, 10).length,
                }).map((_, index) => (
                  <Attempt key={`placeholder2-${index}`} />
                ))}
              </div>

              {/* Column 3: Always show 5 codes */}
              <div className="flex flex-col items-end">
                {correctCodes.slice(10, 15).map((code, index) => (
                  <Attempt
                    key={index + 10}
                    count={String(index + 10).padStart(4, "0")}
                    code={code}
                    color="text-accent-success"
                  />
                ))}
                {Array.from({
                  length: 5 - correctCodes.slice(10, 15).length,
                }).map((_, index) => (
                  <Attempt key={`placeholder3-${index}`} />
                ))}
              </div>
            </div>

            <div className="mt-8"></div>
            <SectionHeader content="Code" />
            <div className="mb-4">
              <canvas ref={canvasRef}></canvas>
            </div>
            <div className="w-full flex justify-between mt-8">
              <span className="text-xs text-secondary uppercase">
                / Niente sarà più come prima.
              </span>
              <span className="text-xs text-secondary uppercase">
                / Diario.
              </span>
            </div>
          </div>
        </GridLayout>
      )}
    </BaseLayout>
  );
}
