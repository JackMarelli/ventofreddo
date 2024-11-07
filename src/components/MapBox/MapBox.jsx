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

      // Define the original path (LineString)
      const geojson = {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'coordinates': [
                [-9.090313, 45.472476],  // Start of the horizontal line (Milan center)
                [100.090313, 45.472476],  // End of the horizontal line (Milan center)
              ],
              'type': 'LineString',
            },
          },
        ],
      };

      const geojsonUser = {
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
              'type': 'LineString',
            },
          }
        ],
      };

      map.current.on('load', () => {
        map.current.addSource('line', {
          type: 'geojson',
          data: geojson,
        });
        map.current.addSource('lineUser', {
          type: 'geojson',
          data: geojsonUser,
        });

        map.current.addLayer({
          type: 'line',
          source: 'lineUser',
          id: 'line-dashed',
          paint: {
            'line-color': 'yellow',
            'line-width': 9,
            'line-dasharray': [0, 4, 3],
          },
        });

        // Add horizontal line layer
        map.current.addLayer({
          type: 'line',
          source: 'line',
          id: 'horizontal-line',
          paint: {
            'line-color': 'white',  // Choose color for the horizontal line
            'line-width': 4,
          },
        });

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
          [0, 3.5, 3, 0.5],
        ];

        let step = 0;

        function animateDashArray(timestamp) {
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

          requestAnimationFrame(animateDashArray);
        }

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
        }}
      />
    </div>
  );
};

export default MapBox;
