import React, { useEffect, useState } from "react";
import "./TextScramble.css"; // We will define our styles here

// Example SVG as a React component (you can import it from a separate file if needed)
const RandomSVG = () => (
  <svg
    width="16"
    height="9.5"
    viewBox="0 0 305 181"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0.09375 16.5692L15.9507 0.71228L152.384 137.146L288.817 0.71228L304.674 16.5692L152.384 168.859L0.09375 16.5692Z"
      fill="#5c5c5c"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M96.9494 99.4432L15.9507 180.442L0.09375 164.585L81.0924 83.5863L96.9494 99.4432Z"
      fill="#5c5c5c"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M223.675 83.5865L304.674 164.585L288.817 180.442L207.818 99.4435L223.675 83.5865Z"
      fill="#5c5c5c"
    />
  </svg>
);

const TextScramble = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const charsForRandom = "!<>-_\\/[]{}—=+*^?#________";

  // Probability of showing an SVG (10%)
  const svgChance = 0.1;

  useEffect(() => {
    const chars = children.split("");
    let index = 0;

    const interval = setInterval(() => {
      if (index < chars.length) {
        scrambleCharacter(index, chars[index]);
        index += 1;
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [children]);

  const scrambleCharacter = (index, finalChar) => {
    const randomTime = Math.random() * (500 - 50) + 50;

    // Determine whether to display an SVG or a random character
    const showSVG = Math.random() < svgChance;
    const randomChar = showSVG ? (
      <RandomSVG key={`scramble-svg-${index}`} className="svg-class" />
    ) : (
      charsForRandom[Math.floor(Math.random() * charsForRandom.length)]
    );

    setCharacters((prevCharacters) => [
      ...prevCharacters,
      <span key={`scramble-${index}`} className="text-secondary leading-none">
        {randomChar}
      </span>,
    ]);

    setTimeout(() => {
      setCharacters((prevCharacters) => [
        ...prevCharacters.slice(0, index),
        <span className="leading-none" key={index}>
          {finalChar}
        </span>,
        ...prevCharacters.slice(index + 1),
      ]);
    }, randomTime);
  };

  return <div className="w-full h-fit">{characters}</div>;
};

export default TextScramble;
