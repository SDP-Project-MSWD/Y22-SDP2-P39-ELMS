import React, { useState } from 'react';
import API from '../../../Hooks/Api';
import { Link } from 'react-router-dom';
import { ADMIN_MULTER } from '../../../Utils/EndPoints';
import toast from 'react-hot-toast';

const Multer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('csvFile', selectedFile);

    try {
      await API.post(ADMIN_MULTER, formData);
      toast.success("File Uploaded Successfully!")
      setError(null); // Clear any previous errors
    } catch (error) {
      setError('Error uploading file. Please try again.'); // Set error message
    }
  };

  return (
    <div className="upload-container" style={{ paddingTop: "30%"}}>
      <center>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fileInput">Choose a CSV file: </label>
        <input type='file' id="fileInput" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <button type='submit'>Upload</button>
        {/* Display error message if there's any */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p align="center">Reload the page to view data here or click the link below:</p>
      <div align="center">
        <Link to="/admin/all-employees">View Data Here</Link>
      </div>
      </center>
    </div>
    
  );
}

export default Multer;