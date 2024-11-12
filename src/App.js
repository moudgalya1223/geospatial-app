// src/App.js
import React, { useState } from "react";
import AuthComponent from "./AuthComponent";
import FileUpload from "./fileupload.js";
import MapComponent from "./MapComponent";
import toGeoJSON from "togeojson"; // Import the toGeoJSON library

function App() {
  const [geojsonData, setGeojsonData] = useState(null); // Store the GeoJSON data

  // Handle file upload and parse GeoJSON or KML data
  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        let data;

        if (fileExtension === "geojson") {
          data = JSON.parse(event.target.result); // Parse GeoJSON directly
        } else if (fileExtension === "kml") {
          const kml = new DOMParser().parseFromString(event.target.result, "text/xml");
          data = toGeoJSON.kml(kml); // Convert KML to GeoJSON
        } else {
          alert("Invalid file type");
          return;
        }

        if (data.type === "FeatureCollection") {
          setGeojsonData(data); // Set the GeoJSON data for Mapbox
        } else {
          alert("Invalid file format");
        }
      } catch (error) {
        alert("Error reading or parsing file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <h1>Geospatial App</h1>
      
      {/* Authentication Component */}
      <AuthComponent />

      {/* File Upload Component */}
      <FileUpload onFileUpload={handleFileUpload} />

      {/* MapComponent to display GeoJSON data */}
      {geojsonData && <MapComponent geojsonData={geojsonData} />}
    </div>
  );
}

export default App;
