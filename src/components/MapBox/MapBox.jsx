import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapBox = ({ className }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerDivRef = useRef(null);
  const markerRef = useRef(null);

  const coordinates = [
    [9.1919, 45.4641],
    [9.1919, 45.4649],
    [9.1919, 45.4661],
    [9.194, 45.4661],
    [9.194, 45.4671],
    [9.194, 45.4679],
    [9.194, 45.4671],
    [9.194, 45.4661],
    [9.1919, 45.4661],
    [9.1919, 45.4649],
    [9.1919, 45.4641],
  ];

  const totalDuration = 50000;

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/jackmarelli/cm2da6wzv006201ph66aqamf0",
        zoom: 15,
        center: [9.1919, 45.4641],
        minZoom: 9,
        maxZoom: 16,
        attributionControl: false,
      });

      map.current.dragRotate.disable();
      map.current.touchPitch.disable();

      const geojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [
                [-9.090313, 45.472476],
                [100.090313, 45.472476],
              ],
            },
          },
        ],
      };

      map.current.on("load", () => {
        map.current.addSource('line', { type: 'geojson', data: geojson });
        map.current.addLayer({
          type: 'line',
          source: 'line',
          id: 'horizontal-line',
          paint: { 'line-color': '#8D8D8D', 'line-width': 4 },
        });
        map.current.addSource("trail", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: [],
                },
              },
            ],
          },
        });

        map.current.addLayer({
          id: "trail-line",
          type: "line",
          source: "trail",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: { "line-color": "#FF0000", "line-width": 3 },
        });

        markerRef.current = new mapboxgl.Marker({
          element: markerDivRef.current,
        })
          .setLngLat(coordinates[0])
          .addTo(map.current);

        let direction = 1;
        let trailCoordinates = [coordinates[0]];

        const interpolateCoordinates = (start, end, t) => [
          start[0] + (end[0] - start[0]) * t,
          start[1] + (end[1] - start[1]) * t,
        ];

        const animateMarker = (timestamp) => {
          const progress = (timestamp % totalDuration) / totalDuration;
          const segmentLength = 1 / (coordinates.length - 1);
          const adjustedProgress = direction === 1 ? progress : 1 - progress;
          const segmentIndex = Math.floor(adjustedProgress / segmentLength);
          const segmentProgress =
            (adjustedProgress - segmentIndex * segmentLength) / segmentLength;
          const interpolatedPosition = interpolateCoordinates(
            coordinates[segmentIndex],
            coordinates[segmentIndex + 1],
            segmentProgress
          );

          markerRef.current.setLngLat(interpolatedPosition);

          if (
            trailCoordinates.length === 0 ||
            trailCoordinates[trailCoordinates.length - 1][0] !==
              interpolatedPosition[0] ||
            trailCoordinates[trailCoordinates.length - 1][1] !==
              interpolatedPosition[1]
          ) {
            trailCoordinates.push(interpolatedPosition);
            map.current.getSource("trail").setData({
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "LineString",
                    coordinates: trailCoordinates,
                  },
                },
              ],
            });
          }

          if (
            (progress >= 1 && direction === 1) ||
            (progress <= 0 && direction === -1)
          )
            direction *= -1;

          requestAnimationFrame(animateMarker);
        };

        requestAnimationFrame(animateMarker);
      });
    }

    return () => map.current && map.current.remove();
  }, []);

  return (
    <div ref={mapContainer} className={className}>
      <div
        ref={markerDivRef}
        style={{
          width: "15px",
          height: "15px",
          backgroundColor: "white",
          borderRadius: "50%",
          boxShadow: "0px 0px 0px 6px rgba(255,255,255,0.54)",
        }}
      />
    </div>
  );
};

export default MapBox;

