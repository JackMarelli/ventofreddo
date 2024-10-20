import React from "react";
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import GridLayout from "../../layouts/GridLayout/GridLayout";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import TextScramble from "../../components/TextScramble/TextScramble"; // Import the TextScramble component

const CountDown = ({ quote }) => {
  return (
    <BaseLayout>
      <GridLayout>
        <SectionHeader content="Prepare" />
        <div className="col-span-full text-6xl h-fit mb-8">23:15:04</div>
        <SectionHeader content="Quote" />
        <div className="col-span-full text-lg h-fit">
          <TextScramble>{quote}</TextScramble>
        </div>
      </GridLayout>
      <div className="w-fit h-fit absolute bottom-8 left-4 text-sm text-secondary uppercase">
        / NO POLICY .
      </div>
      <div className="w-fit h-fit absolute bottom-8 right-4 text-sm text-secondary uppercase text-end">
        / STAY SAFE .
      </div>
    </BaseLayout>
  );
};

export default CountDown;
