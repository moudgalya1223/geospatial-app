// src/FileUpload.js
import React, { useState } from "react";

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      onFileUpload(uploadedFile); // Pass the file to the parent component
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".geojson,.kml"
        onChange={handleFileChange}
      />
      {file && <p>{file.name}</p>}
    </div>
  );
};

export default FileUpload;
