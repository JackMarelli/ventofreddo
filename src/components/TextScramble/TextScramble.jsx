import React, { useEffect, useState } from "react";
import "./TextScramble.css"; // We will define our styles here

const TextScramble = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const charsForRandom = "!<>-_\\/[]{}—=+*^?#________";

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
    const randomChar =
      charsForRandom[Math.floor(Math.random() * charsForRandom.length)];

    setCharacters((prevCharacters) => [
      ...prevCharacters,
      <span key={`scramble-${index}`} className="text-secondary leading-none">
        {randomChar}
      </span>,
    ]);

    setTimeout(() => {
      setCharacters((prevCharacters) => [
        ...prevCharacters.slice(0, index),
        <span className="leading-none" key={index}>{finalChar}</span>,
        ...prevCharacters.slice(index + 1),
      ]);
    }, randomTime);
  };

  return <div>{characters}</div>;
};

export default TextScramble;
