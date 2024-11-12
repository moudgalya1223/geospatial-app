// src/MapComponent.js
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw"; // Import Mapbox Draw
import { Popup } from "mapbox-gl"; // Popup component from Mapbox GL

const MapComponent = ({ geojsonData }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [draw, setDraw] = useState(null); // State to hold the draw control instance
  const [hoveredFeature, setHoveredFeature] = useState(null); // To store hovered feature data

  useEffect(() => {
    // Set Mapbox Access Token
    mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN"; // Replace with your Mapbox token

    // Initialize Map
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40], // Initial center (adjust as necessary)
      zoom: 9, // Initial zoom
    });

    mapInstance.on("load", () => {
      // Add the GeoJSON data to the map if available
      if (geojsonData) {
        mapInstance.addSource("geojson-data", {
          type: "geojson",
          data: geojsonData,
        });

        mapInstance.addLayer({
          id: "geojson-layer",
          type: "fill",
          source: "geojson-data",
          paint: {
            "fill-color": "#888888",
            "fill-opacity": 0.4,
          },
        });
      }

      // Initialize the Draw control and add it to the map
      const drawControl = new MapboxDraw();
      mapInstance.addControl(drawControl);

      // Store the map and draw control in the state
      setMap(mapInstance);
      setDraw(drawControl);

      // Add event listeners for hover functionality
      mapInstance.on("mousemove", handleHover);
      mapInstance.on("mouseleave", handleMouseLeave);
    });

    // Cleanup the map when the component is unmounted
    return () => {
      if (mapInstance) {
        mapInstance.off("mousemove", handleHover);
        mapInstance.off("mouseleave", handleMouseLeave);
        mapInstance.remove();
      }
    };
  }, [geojsonData]);

  // Handle hover event to display information
  const handleHover = (e) => {
    const features = map.queryRenderedFeatures(e.point);

    if (features.length > 0) {
      const feature = features[0]; // Get the first feature under the cursor
      setHoveredFeature(feature); // Set the hovered feature to show in the popup

      // Create a Popup to display feature information
      new Popup({ offset: 15 })
        .setLngLat(e.lngLat)
        .setHTML(`
          <h4>${feature.properties.name || 'Unknown Feature'}</h4>
          <p>${feature.properties.description || 'No description available'}</p>
        `)
        .addTo(map);
    }
  };

  // Handle mouse leave event to remove the hover card
  const handleMouseLeave = () => {
    setHoveredFeature(null);
    const popups = document.querySelectorAll(".mapboxgl-popup");
    popups.forEach((popup) => popup.remove()); // Remove all popups
  };

  // Handle saving the drawn features (e.g., save it to your server)
  const handleSave = () => {
    if (draw) {
      const data = draw.getAll();
      console.log("Drawn data:", data);
      // Here, you can send the data to the server or handle it as needed
    }
  };

  // Handle clearing the drawn features
  const handleClear = () => {
    if (draw) {
      draw.deleteAll();
    }
  };

  return (
    <div>
      <h2>Draw and Edit Shapes on the Map</h2>
      
      <div ref={mapContainer} style={{ width: "100%", height: "500px" }} />

      {/* Buttons to handle saving and clearing */}
      <button onClick={handleSave}>Save Drawn Data</button>
      <button onClick={handleClear}>Clear All Drawn Data</button>

      {hoveredFeature && (
        <div className="hover-card">
          <h3>{hoveredFeature.properties.name || "Feature"}</h3>
          <p>{hoveredFeature.properties.description || "No description available"}</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
