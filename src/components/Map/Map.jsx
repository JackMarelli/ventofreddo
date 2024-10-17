// src/components/Map.js
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';

// Load Mapbox access token from environment variable
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MovingPointMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerRef = useRef(null);

  const [coordinates, setCoordinates] = useState([
    [-74.0060, 40.7128], // Starting point (NYC)
    [-74.0030, 40.7140],
    [-74.0010, 40.7160],
    [-73.9980, 40.7180],
    [-73.9950, 40.7200],
  ]);
  
  const [pointIndex, setPointIndex] = useState(0); // To track the current position in the array
  const [dotStyle, setDotStyle] = useState({
    width: '20px',
    height: '20px',
    backgroundColor: 'red',
    borderRadius: '50%',
  });

  // Initialize the map on first render
  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11', // Map style
        center: [-74.0060, 40.7128], // Initial map center
        zoom: 12, // Initial zoom level
      });

      // Add a marker to the map
      markerRef.current = new mapboxgl.Marker({
        element: createMarkerElement(), // Create a custom element for the marker
      })
        .setLngLat(coordinates[0]) // Start marker at the first coordinate
        .addTo(map.current);
    }

    // Move the point along the coordinates every 2 seconds
    const interval = setInterval(() => {
      setPointIndex((prevIndex) => (prevIndex + 1) % coordinates.length);
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Update marker position and style when the pointIndex changes
  useEffect(() => {
    if (markerRef.current) {
      // Update the marker's position
      markerRef.current.setLngLat(coordinates[pointIndex]);

      // Dynamically change dot style (color and size)
      setDotStyle((prevStyle) => ({
        ...prevStyle,
        backgroundColor: pointIndex % 2 === 0 ? 'blue' : 'red',
        width: pointIndex % 2 === 0 ? '15px' : '20px',
      }));
    }
  }, [pointIndex]);

  // Create a custom HTML element for the marker (dot)
  const createMarkerElement = () => {
    const markerDiv = document.createElement('div');
    markerDiv.style.width = dotStyle.width;
    markerDiv.style.height = dotStyle.height;
    markerDiv.style.backgroundColor = dotStyle.backgroundColor;
    markerDiv.style.borderRadius = '50%';
    return markerDiv;
  };

  return <div ref={mapContainer} className="w-full " />;
};

export default MovingPointMap;
