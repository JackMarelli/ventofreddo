import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Attempt from "../../components/Attempt/Attempt";
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import GridLayout from "../../layouts/GridLayout/GridLayout";
import "./Input.css";

export default function Input() {
  return (
    <BaseLayout>
      <GridLayout>
        <SectionHeader content="Input" />
        <div class="col-span-full w-full relative mb-8">
          <input
            class="my-crop bg-bg w-full h-[58px] absolute top-1/2 left-1/2 -translate-x-[49.9%] sm:-translate-x-[49.92%] -translate-y-1/2 z-20 text-3xl px-4"
            type="number"
          />
          <div className="my-crop bg-white w-[calc(100%+1px)] sm:w-[calc(100%+2px)] h-[59px] z-10"></div>
        </div>
        <SectionHeader content="Attempts" />
        <Attempt count="0139" code="2934159" color="text-accent-success" />
        <Attempt count="0672" code="9203475" color="text-accent-success" />
        <Attempt count="0456" code="1279832" color="text-accent-success" />
        <Attempt count="0987" code="3748293" color="text-accent-success" />
        <Attempt count="0321" code="5647382" color="text-accent-success" />
        <Attempt />
        <Attempt />
        <Attempt />
        <Attempt />
        <Attempt />
        <Attempt />
        <Attempt />
        <Attempt />
        <Attempt />
        <Attempt />
        <div className="my-8"></div>
        <SectionHeader content="Quote" />
      </GridLayout>
    </BaseLayout>
  );
}
