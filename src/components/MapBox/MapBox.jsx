// src/components/Map.js
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


// Load Mapbox access token from environment variable
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapBox = ({className}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerDivRef = useRef(null);
  const markerRef = useRef(null);

  const [coordinates, setCoordinates] = useState([
    [9.1919, 45.4641 ], 
    [9.1919, 45.4649 ],
    [9.1919, 45.4661 ],
    [9.1919, 45.46665 ],
    [9.1919, 45.4669 ],
  ]);
  
  const [pointIndex, setPointIndex] = useState(0); // To track the current position in the array
  const [dotStyle, setDotStyle] = useState({
    width: '20px',
    height: '20px',
    backgroundColor: 'white',
    borderRadius: '50%',

    transition: 'transform 1s linear', // Transition for smooth scaling
  });


  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/jackmarelli/cm2da6wzv006201ph66aqamf0',  
        zoom: 15, 
        center: [9.1919, 45.4641 ],
        minZoom: 9, 
        maxZoom: 16
      });
      map.current.dragRotate.disable();
      map.current.touchPitch.disable();

      map.current.on('move', () => {
        
        markerDivRef.current.style.transition = " transform 0s ease ";
      });

      map.current.on('moveend', () => {
  
        markerDivRef.current.style.transition = dotStyle.transition;
      });

      // Add a marker to the map
      markerRef.current = new mapboxgl.Marker({
        element: markerDivRef.current, 
      })
        .setLngLat(coordinates[0]) 
        .addTo(map.current);
    }

    const interval = setInterval(() => {
      setPointIndex((prevIndex) => (prevIndex + 1) % coordinates.length);
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLngLat(coordinates[pointIndex]);

      setDotStyle((prevStyle) => ({
        ...prevStyle,
       
      }));
      
      if (markerDivRef.current) {
        markerDivRef.current.style.width = dotStyle.width;
        markerDivRef.current.style.height = dotStyle.height;
        markerDivRef.current.style.transition = dotStyle.transition;
      }
    }
  }, [pointIndex, dotStyle]);

  



  return (
    <div ref={mapContainer} className={className}>
      <div
        ref={markerDivRef} 
        style={{
          width: dotStyle.width,
          height: dotStyle.height,
          backgroundColor: dotStyle.backgroundColor,
          borderRadius: dotStyle.borderRadius,
          transition: dotStyle.transition,
        }}
      />
    </div>
  );
};

export default MapBox;
