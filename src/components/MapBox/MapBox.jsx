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
    [9.170016, 45.472438],
    [9.170896, 45.475415],
    [9.172128, 45.475546],
    [9.171901, 45.477225],
    [9.173412, 45.476990],
    [9.173091, 45.475482],
    [9.171982, 45.473695],
    [9.173499, 45.473040],
    [9.174891, 45.473290],
    [9.174022, 45.475159],
    [9.174671, 45.476635],
    [9.175756, 45.476460],
    [9.175478, 45.475437],
    [9.176085, 45.473349],
    [9.175393, 45.471980],
    [9.176556, 45.471876],
    [9.177777, 45.473148],
    [9.177146, 45.473162],
    [9.177777, 45.473148],
    [9.176556, 45.471876],
    [9.175393, 45.471980],
    [9.176085, 45.473349],
    [9.175478, 45.475437],
    [9.175756, 45.476460],
    [9.174671, 45.476635],
    [9.174022, 45.475159],
    [9.174891, 45.473290],
    [9.173499, 45.473040],
    [9.171982, 45.473695],
    [9.173091, 45.475482],
    [9.173412, 45.476990],
    [9.171901, 45.477225],
    [9.172128, 45.475546],
    [9.170896, 45.475415],
    [9.170016, 45.472438]
  ];


  const totalDuration = 270000;

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/jackmarelli/cm2da6wzv006201ph66aqamf0",
        zoom: 15,
        center: [9.171901, 45.477225],
        minZoom: 9,
        maxZoom: 16,
        attributionControl: false,
      });

      map.current.dragRotate.disable();
      map.current.touchPitch.disable();
      map.current.touchZoomRotate.disableRotation();

      const geojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [
                [-9.090313, 45.474374],
                [100.090313, 45.474374],
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

