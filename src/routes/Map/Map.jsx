import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import MapBox from "../../components/MapBox/MapBox";
import CityFog from "../../components/CityFog/CityFog";
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import GridLayout from "../../layouts/GridLayout/GridLayout";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import TextScramble from "../../components/TextScramble/TextScramble";
import ApiManager from "../../api/ApiManager/ApiManager";
import { log } from "three/webgpu";

const Map = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const inputBoxRef = useRef(null);
  const croppedBorderRef = useRef(null);
  const api = new ApiManager();

  const handleInputChange = (e) => {
    const regex =
      /^-?(?:180(?:\.0{0,5})?|(?:1[0-7][0-9]|[1-9]?[0-9])(?:\.\d{0,5})?)$/;
    let value = e.target.value;

    // Allow empty string or just "-" for intermediate states
    if (value === "" || value === "-") {
      setInputValue(value);
      return;
    }

    // Check if the value matches the valid coordinate format
    if (regex.test(value)) {
      setInputValue(value);

      let len = value.length;

      if (len >= 8) {
        e.target.value = value.slice(0, 8);


        api
          .post("check-code", { code: value })
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
    } else {
      // Prevent invalid input
      e.target.value = inputValue; // Revert to the last valid state
    }
  };

  return (
    <BaseLayout>
      {window.innerWidth < 768 ? (
        <div className="w-screen h-[100dvh] relative overflow-hidden">
          <div className="z-50 absolute top-0 bottom-0 start-0 end-0 overflow-auto flex flex-col gap-x-2 px-4 py-8 bg-transparent pointer-events-none">
            <div className="col-span-full md:col-span-6 w-full relative mb-8 select-none z-50">
              <input
                className="pointer-events-auto my-crop bg-bg w-full h-[58px] absolute top-1/2 left-1/2 -translate-x-[49.9%] sm:-translate-x-[49.92%] -translate-y-1/2 z-20 text-xl px-4 select-none"
                type="text"
                onChange={(e) => handleInputChange(e)}
              />
              <div
                ref={inputBoxRef}
                className="my-crop bg-white w-[calc(100%+1px)] sm:w-[calc(100%+2px)] h-[59px] z-10 select-none"
              ></div>
              <div className="absolute text-xl right-5 z-50 top-1/2 -translate-y-1/2">
                - 20.48155
              </div>
            </div>
            <div className="absolute bottom-4 start-4 end-4">
              <div className="my-crop w-full relative bg-white h-48 pointer-events-auto">
                <div className="my-crop bg-bg absolute top-1/2 -translate-y-1/2 start-1/2 -translate-x-1/2 w-[calc(100%-3px)] h-[calc(100%-3px)] overflow-scroll p-4">
                  Il tempo stringe. Un brivido mi attraversa: sento di nuovo
                  quel vento, ma stavolta sembra portare con sé un sussurro di
                  avvertimento. Se riuscissi a identificare un terzo punto tra
                  questi due luoghi...
                </div>
              </div>
              <div className="w-full flex grow justify-between items-end mt-8">
                <span className="text-xs text-secondary uppercase">
                  / Niente sarà più come prima.
                </span>
                <span onClick={() => navigate("/diario")} className="pointer-events-auto text-xs text-secondary uppercase">
                  / Diario.
                </span>
              </div>
            </div>
          </div>
          <MapBox className="absolute h-screen start-0 end-0" />
        </div>
      ) : (
        <div className="w-screen h-screen flex">
          <div className="w-1/2 overflow-auto flex flex-col gap-x-2 gap-x-4 px-8 my-4">
            <SectionHeader content="Sii Intelligente" />
            <div className="col-span-full md:col-span-6 w-full relative mb-8 select-none">
              <input
                className="my-crop bg-bg w-full h-[58px] absolute top-1/2 left-1/2 -translate-x-[49.9%] sm:-translate-x-[49.92%] -translate-y-1/2 z-20 text-xl px-4 select-none"
                type="text"
                onChange={(e) => handleInputChange(e)}
              />
              <div
                ref={inputBoxRef}
                className="my-crop bg-white w-[calc(100%+1px)] sm:w-[calc(100%+2px)] h-[59px] z-10 select-none"
              ></div>
              <div className="absolute text-xl right-5 z-50 top-1/2 -translate-y-1/2">
                - 20.48155
              </div>
            </div>
            <SectionHeader content="Nota" />
            <TextScramble>
              Il tempo stringe. Un brivido mi attraversa: sento di nuovo quel
              vento, ma stavolta sembra portare con sé un sussurro di
              avvertimento. Se riuscissi a identificare un terzo punto tra
              questi due luoghi...
            </TextScramble>
            <div className="mb-4"></div>
            {/* <img
              className="w-full my-5 h-0 !transition !duration-500 !delay-100 !ease-out"
              src="assets/images/paper.png"
              alt=""
            /> */}
            <div className="w-full flex grow justify-between items-end mb-8">
              <span className="text-xs text-secondary uppercase">
                / Niente sarà più come prima.
              </span>
              <span
                onClick={() => navigate("/diario")}
                className="text-xs text-secondary uppercase cursor-pointer"
              >
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
