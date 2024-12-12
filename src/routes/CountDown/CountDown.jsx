import React from "react";
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import GridLayout from "../../layouts/GridLayout/GridLayout";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import TextScramble from "../../components/TextScramble/TextScramble"; // Import the TextScramble component

const CountDown = ({ quote }) => {
  return (
    <BaseLayout>
      <GridLayout>
        <SectionHeader content="Preparati" />
        <div className="col-span-full text-6xl h-fit mb-8">23:15:04</div>
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
