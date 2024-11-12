import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";

// Make sure to replace this with your actual Mapbox token
const MAPBOX_TOKEN = "your_mapbox_access_token_here";

const MapboxComponent = () => {
  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: "map", // This is the div ID for the map
      style: "mapbox://styles/mapbox/streets-v11", // You can choose different Mapbox styles
      center: [-74.5, 40], // Starting position [longitude, latitude]
      zoom: 9,
    });

    // Add navigation controls (optional)
    map.addControl(new mapboxgl.NavigationControl());

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div>
      <h2>Mapbox Map</h2>
      <div id="map" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
};

export default MapboxComponent;
