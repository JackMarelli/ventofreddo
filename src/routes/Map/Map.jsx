
import React from 'react';
import MapBox from '../../components/MapBox/MapBox';
import CityFog from '../../components/CityFog/CityFog';

const Map = () => {
  return (
    <div className="">
         <MapBox className="fixed w-full h-screen" />  
         {/* <CityFog/>  */}
    </div>
  );
};

export default Map;