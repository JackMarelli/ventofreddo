
import React from 'react';
import MapBox from '../../components/MapBox/MapBox';
import CityFog from '../../components/CityFog/CityFog';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import GridLayout from "../../layouts/GridLayout/GridLayout";

const Map = () => {
  return (

    <BaseLayout>
      {window.innerWidth < 768 ? (
        <GridLayout>

        </GridLayout>
      ) : (
        <GridLayout>
          
          <div className="col-span-6 flex flex-col text-md h-fit mx-4 overflow-auto">
            
          </div>
          <div className="col-span-6 flex flex-col h-fit sticky ">
            <MapBox className="fixed w-full h-screen" />
          </div>
        </GridLayout>
      )}
    </BaseLayout>
  );
};

export default Map;