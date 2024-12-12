import React, { useState, useEffect } from 'react';

export default function Attempt({
  count = "XXXX",
  code = "XXXXXXX",
  color = "text-primary",
}) {
  const [displayedCode, setDisplayedCode] = useState(code);
  const [textColor, setTextColor] = useState(color);

  useEffect(() => {
    if (code !== "XXXXXXX") return;

    const randomTime = () => Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;

    const startRandomCode = () => {
      // Set the text color to red during the animation
      setTextColor("text-red-500");

      const randomCode = Math.floor(1000000 + Math.random() * 9000000).toString(); // Generate 7-digit number
      setDisplayedCode(randomCode);

      // Start reverting back to "XXXXXXX" one digit at a time
      let revertIndex = 0;
      const revertInterval = setInterval(() => {
        // Ensure only the first (7 - revertIndex) digits remain, and fill the rest with "X"
        setDisplayedCode(
          randomCode.slice(0, 7 - revertIndex - 1).padEnd(7, 'X')
        );

        revertIndex++;
        if (revertIndex === 7) {
          clearInterval(revertInterval);
          // Change the color back to white after the animation completes
          setTextColor(color);
        }
      }, 100); // Change 200ms as needed to slow or speed up the disappearance
    };

    const intervalId = setInterval(() => {
      if (Math.random() < 0.4) { // 10% chance of triggering each interval
        startRandomCode();
      }
    }, randomTime());

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [code, color]);

  return (
    <div className="block tracking">
      <span className="hidden xs:inline text-secondary me-2 text-sm md:text-md">
        {count}
      </span>
      <span className={`${textColor} text-sm md:text-md`}>{displayedCode}</span>
    </div>
  );
}
