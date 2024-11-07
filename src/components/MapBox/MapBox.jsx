// src/components/Map.js
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


// Load Mapbox access token from environment variable
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapBox = ({ className }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerDivRef = useRef(null);
  const markerRef = useRef(null);

  const [coordinates, setCoordinates] = useState([
    [9.1919, 45.4641],
    [9.1919, 45.4649],
    [9.1919, 45.4661],
    [9.194, 45.4661],
    [9.194, 45.4671],
    [9.194, 45.4679],
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
        center: [9.1919, 45.4641],
        minZoom: 9,
        maxZoom: 16,
        attributionControl: false,
        
      });
      map.current.dragRotate.disable();
      map.current.touchPitch.disable();

      // map.current.on('move', () => {

      //   markerDivRef.current.style.transition = " transform 0s ease ";
      // });

      // map.current.on('moveend', () => {

      //   markerDivRef.current.style.transition = dotStyle.transition;
      // });

      const geojson = {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'coordinates': [
                [9.1919, 45.4641],
                [9.1919, 45.4649],
                [9.1919, 45.4661],
                [9.194, 45.4661],
                [9.194, 45.4671],
                [9.194, 45.4679],

              ],
              'type': 'LineString'
            }
          }
        ]
      };

      map.current.on('load', () => {
        map.current.addSource('line', {
          type: 'geojson',
          data: geojson
        });

        map.current.addLayer({
          type: 'line',
          source: 'line',
          id: 'line-dashed',
          paint: {
            'line-color': 'yellow',
            'line-width': 9,
            'line-dasharray': [0, 4, 3]
          }
        });

        // technique based on https://jsfiddle.net/2mws8y3q/
        // an array of valid line-dasharray values, specifying the lengths of the alternating dashes and gaps that form the dash pattern
        const dashArraySequence = [
          [0, 4, 3],
          [0.5, 4, 2.5],
          [1, 4, 2],
          [1.5, 4, 1.5],
          [2, 4, 1],
          [2.5, 4, 0.5],
          [3, 4, 0],
          [0, 0.5, 3, 3.5],
          [0, 1, 3, 3],
          [0, 1.5, 3, 2.5],
          [0, 2, 3, 2],
          [0, 2.5, 3, 1.5],
          [0, 3, 3, 1],
          [0, 3.5, 3, 0.5]
        ];

        let step = 0;

        function animateDashArray(timestamp) {
          // Update line-dasharray using the next value in dashArraySequence. The
          // divisor in the expression `timestamp / 50` controls the animation speed.
          const newStep = parseInt(
            (timestamp / 50) % dashArraySequence.length
          );

          if (newStep !== step) {
            map.current.setPaintProperty(
              'line-dashed',
              'line-dasharray',
              dashArraySequence[step]
            );
            step = newStep;
          }

          // Request the next frame of the animation.
          requestAnimationFrame(animateDashArray);
        }

        // start the animation
        animateDashArray(0);
      });

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
          // transition: dotStyle.transition,
        }}
      />
    </div>
  );
};

export default MapBox;
