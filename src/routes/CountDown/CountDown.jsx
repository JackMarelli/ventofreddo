import React, { useEffect, useState } from "react";
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import GridLayout from "../../layouts/GridLayout/GridLayout";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import TextScramble from "../../components/TextScramble/TextScramble"; // Import the TextScramble component

const CountDown = ({ endDateTime, quote }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: "00", minutes: "00", seconds: "00" });

  // Function to calculate the remaining time
  function calculateTimeLeft() {
    if (!endDateTime) return { hours: "00", minutes: "00", seconds: "00" }; // Validate input

    const now = new Date();
    const endTime = new Date(endDateTime);

    // Check if the endDateTime is valid
    if (isNaN(endTime)) {
      console.error("Invalid endDateTime format:", endDateTime);
      return { hours: "00", minutes: "00", seconds: "00" };
    }

    const diff = endTime - now;

    if (diff <= 0) {
      return { hours: "00", minutes: "00", seconds: "00" }; // Countdown finished
    }

    const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
    const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

    return { hours, minutes, seconds };
  }

  // Update the countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Clear the interval when the component is unmounted
  }, [endDateTime]);

  return (
    <BaseLayout>
      <GridLayout>
        <SectionHeader content="Preparati" />
        {/* Display the countdown */}
        <div className="col-span-full text-6xl h-fit mb-8">
          {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
        </div>
        <SectionHeader content="Nota" />
        <div className="col-span-12 md:col-span-6 md:col-start-1 text-lg h-fit">
          <TextScramble>{quote}</TextScramble>
        </div>
      </GridLayout>
      <div className="w-fit h-fit absolute bottom-8 left-4 text-xs text-secondary uppercase">
        / Niente sarà più come prima .
      </div>
      <div className="w-fit h-fit absolute bottom-8 right-4 text-xs text-secondary uppercase text-end">
        / Diario .
      </div>
    </BaseLayout>
  );
};

export default CountDown;
