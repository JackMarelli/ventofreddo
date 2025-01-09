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
    [9.170707, 45.473060],
    [9.170898, 45.475605],
    [9.172230, 45.475411],
    [9.171762, 45.477228],
    [9.173368, 45.477115],
    [9.173067, 45.475512],
    [9.171975, 45.473743],
    [9.173179, 45.472871],
    [9.174631, 45.473314],
    [9.173915, 45.475185],
    [9.174716, 45.476733],
    [9.176233, 45.476276],
    [9.175421, 45.475366],
    [9.176065, 45.473416],
    [9.175326, 45.471970],
    [9.177567, 45.471872],
    [9.177445, 45.473291],
    [9.177207, 45.474417],
    [9.178767, 45.474417],
    [9.178164, 45.476160],
    [9.180825, 45.475769],
    [9.181121, 45.473756],
    [9.182001, 45.473383],
    [9.181733, 45.474417],
    [9.182584809495216, 45.474417],
    [9.182521, 45.474993],
    [9.183036797031583, 45.474417],
    [9.183636937586304, 45.474417],
    [9.183560, 45.473673],
    [9.184188, 45.474417],
    [9.185232, 45.474417],
    [9.1846622, 45.4752179],
    [9.1853665, 45.4752179],
    [9.185728, 45.474417],
    [9.186391, 45.474417],
    [9.186126846326921, 45.473381327961505],
    [9.189104094771976, 45.47343852704155],
    [9.187962690438244, 45.47581768720675],
    [9.188872850750816, 45.474417],
    [9.189782299619269, 45.474417],
    [9.189289558224175, 45.47663017905696],
    [9.189289558224175, 45.47663017905696],
    [9.18982252340479, 45.47573466552422],
    [9.190204649383343, 45.473421777332106],
    [9.1910895727021, 45.47358396465989],
    [9.190506327787466, 45.474417],
    [9.191200188116945, 45.474417],
    [9.191200188116945, 45.4760519750968],
    [9.192335108492538, 45.475632084192235],
    [9.19218894720213, 45.47355764489097],
    [9.192972371990626, 45.47344285155491],
    [9.192694817323453, 45.47525191789021],
    [9.193328918007175, 45.47520171630842],
    [9.193394510220555, 45.47353987071984],
    [9.193694, 45.475401],
    [9.193925016913564, 45.474417],
    [9.194493588072714, 45.474417],
    [9.195107325922168, 45.472543225852256],
    [9.195882241936522, 45.473492096462195],
    [9.19503579521315, 45.474417],
    [9.195971655322792, 45.474417],
    [9.195743, 45.475269],
    [9.19620526272241, 45.474417],
    [9.197100356041185, 45.474417],
    [9.197005844481874, 45.47381567959516],
    [9.1980769754874, 45.47389962765269],
    [9.1980769754874, 45.474417],
    [9.199327, 45.474417],
    [9.19965512461555, 45.47370070779519],
    [9.199600561461972, 45.474417],
    [9.200525519072212, 45.474417],
    [9.200006357124375, 45.475285892939915],
    [9.201216087151783, 45.47530845550143],
    [9.201021332457332, 45.474417],
    [9.201823685902898, 45.474417],
    [9.202188466298194, 45.473732341471546],
    [9.202617619704425, 45.474845800764705],
    [9.202816811538542, 45.47377607106603],
    [9.203515223050456, 45.47464736566374],
    [9.203584252095238, 45.474417],
    [9.204128363587452, 45.474417],
    [9.204404479766582, 45.47374759716146],
    [9.204766764811927, 45.474417],
    [9.205350377162657, 45.474417],
    [9.206401785618347, 45.4757480883813],
    [9.205749816227973, 45.47374513634],
    [9.207051481067214, 45.47398981217092],
    [9.206517035498052, 45.474965190243815],
    [9.207696097590096, 45.47465946053887],
    [9.207604679261863, 45.47419757542058],
    [9.208500590053433, 45.4742433918891],
    [9.208113820203208, 45.474417],
    [9.209274129848467, 45.474417],
    [9.20899958816968, 45.47515189730901],
    [9.210535710297142, 45.47495047728065],
    [9.210098602374693, 45.474417],
    [9.210754264258366, 45.474417],
    [9.211210105384858, 45.473597441460576],
    [9.21130377136824, 45.474417],
    [9.212185735383526, 45.474417],
    [9.212586514134102, 45.47551558201677],
    [9.212730894146327, 45.474417],
    [9.214550788560905, 45.474417],
    [9.214090353886599, 45.473525746398536],
    [9.215955712107965, 45.47382087620512],
    [9.215392448262287, 45.474417],
    [9.216116595493183, 45.474417],
    [9.216846159911196, 45.47687531329604],
    [9.217237762468494, 45.47362903303672],

    [9.218718341719988, 45.475878503194416],
    
    [9.217237762468494, 45.47362903303672],
    [9.216846159911196, 45.47687531329604],
    [9.216116595493183, 45.474417],
    [9.215392448262287, 45.474417],
    [9.215955712107965, 45.47382087620512],
    [9.214090353886599, 45.473525746398536],
    [9.214550788560905, 45.474417],
    [9.212730894146327, 45.474417],
    [9.212586514134102, 45.47551558201677],
    [9.212185735383526, 45.474417],
    [9.21130377136824, 45.474417],
    [9.211210105384858, 45.473597441460576],
    [9.210754264258366, 45.474417],
    [9.210098602374693, 45.474417],
    [9.210535710297142, 45.47495047728065],
    [9.20899958816968, 45.47515189730901],
    [9.209274129848467, 45.474417],
    [9.208113820203208, 45.474417],
    [9.208500590053433, 45.4742433918891],
    [9.207604679261863, 45.47419757542058],
    [9.207696097590096, 45.47465946053887],
    [9.206517035498052, 45.474965190243815],
    [9.207051481067214, 45.47398981217092],
    [9.205749816227973, 45.47374513634],
    [9.206401785618347, 45.4757480883813],
    [9.205350377162657, 45.474417],
    [9.204766764811927, 45.474417],
    [9.204404479766582, 45.47374759716146],
    [9.204128363587452, 45.474417],
    [9.203584252095238, 45.474417],
    [9.203515223050456, 45.47464736566374],
    [9.202816811538542, 45.47377607106603],
    [9.202617619704425, 45.474845800764705],
    [9.202188466298194, 45.473732341471546],
    [9.201823685902898, 45.474417],
    [9.201021332457332, 45.474417],
    [9.201216087151783, 45.47530845550143],
    [9.200006357124375, 45.475285892939915],
    [9.200525519072212, 45.474417],
    [9.199600561461972, 45.474417],
    [9.19965512461555, 45.47370070779519],
    [9.199327, 45.474417],
    [9.1980769754874, 45.474417],
    [9.1980769754874, 45.47389962765269],
    [9.197005844481874, 45.47381567959516],
    [9.197100356041185, 45.474417],
    [9.19620526272241, 45.474417],
    [9.195743, 45.475269],
    [9.195971655322792, 45.474417],
    [9.19503579521315, 45.474417],
    [9.195882241936522, 45.473492096462195],
    [9.195107325922168, 45.472543225852256],
    [9.194493588072714, 45.474417],
    [9.193925016913564, 45.474417],
    [9.193694, 45.475401],
    [9.193394510220555, 45.47353987071984],
    [9.193328918007175, 45.47520171630842],
    [9.192694817323453, 45.47525191789021],
    [9.192972371990626, 45.47344285155491],
    [9.19218894720213, 45.47355764489097],
    [9.192335108492538, 45.475632084192235],
    [9.191200188116945, 45.4760519750968],
    [9.191200188116945, 45.474417],
    [9.190506327787466, 45.474417],
    [9.1910895727021, 45.47358396465989],
    [9.190204649383343, 45.473421777332106],
    [9.18982252340479, 45.47573466552422],
    [9.189289558224175, 45.47663017905696],
    [9.189289558224175, 45.47663017905696],
    [9.189782299619269, 45.474417],
    [9.188872850750816, 45.474417],
    [9.187962690438244, 45.47581768720675],
    [9.189104094771976, 45.47343852704155],
    [9.186126846326921, 45.473381327961505],
    [9.186391, 45.474417],
    [9.185728, 45.474417],
    [9.1853665, 45.4752179],
    [9.1846622, 45.4752179],
    [9.185232, 45.474417],
    [9.184188, 45.474417],
    [9.183560, 45.473673],
    [9.183636937586304, 45.474417],
    [9.183036797031583, 45.474417],
    [9.182521, 45.474993],
    [9.182584809495216, 45.474417],
    [9.181733, 45.474417],
    [9.182001, 45.473383],
    [9.181121, 45.473756],
    [9.180825, 45.475769],
    [9.178164, 45.476160],
    [9.178767, 45.474417],
    [9.177207, 45.474417],
    [9.177445, 45.473291],
    [9.177567, 45.471872],
    [9.175326, 45.471970],
    [9.176065, 45.473416],
    [9.175421, 45.475366],
    [9.176233, 45.476276],
    [9.174716, 45.476733],
    [9.173915, 45.475185],
    [9.174631, 45.473314],
    [9.173179, 45.472871],
    [9.171975, 45.473743],
    [9.173067, 45.475512],
    [9.173368, 45.477115],
    [9.171762, 45.477228],
    [9.172230, 45.475411],
    [9.170898, 45.475605],
    [9.170707, 45.473060]
]


  const totalDuration = 810000;

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
                [-9.090313, 45.474417],
                [100.090313, 45.474417],
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

        setTimeout(requestAnimationFrame(animateMarker), 2000);
        
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

export default MapBox;