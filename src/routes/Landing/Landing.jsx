import React from "react";
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import GridLayout from "../../layouts/GridLayout/GridLayout";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import TextScramble from "../../components/TextScramble/TextScramble"; // Import the TextScramble component

const Landing = () => {
  return (
    <BaseLayout>
      <GridLayout>
        <SectionHeader content="Prepare" />
        <div className="col-span-full text-6xl h-fit mb-8">23:15:04</div>
        <SectionHeader content="Quote" />
        <div className="col-span-full text-lg h-fit">
          <TextScramble>
            Qualcuno ha mai notato quanto strano sia il vento vicino al
            Naviglio, di notte? Oggi mi sembrava quasi che... parlasse. Non è un
            modo di dire, eh. Era un sibilo leggero, come un sospiro. Forse è
            solo suggestione, ma… qualcuno di voi lo ha mai sentito?
          </TextScramble>
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

export default Landing;
