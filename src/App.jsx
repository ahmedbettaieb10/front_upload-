import React, { useState } from 'react';
import JsonPrettier from './JsonPrettier';
import './App.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const App = () => {
  const [jsonData, setJsonData] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);


  // This function is called when the user uploads a file
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Check if the file is JSON
    if (file.type !== 'application/json') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please upload a valid JSON file.',
      });
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target.result;
      try {
        const jsonData = JSON.parse(data);
        setJsonData(jsonData);
        setFileName(file.name);
        setError(null);
      } catch (error) {
        setError('Invalid JSON data.');
      }
    };

    reader.readAsText(file);

    const formData = new FormData();
    formData.append('file', file);

   
  };
  
  

  const handleClick = () => {
    if (!jsonData) {
      setError('Please upload a valid JSON file.');
      return;
    }
  
    const formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: 'application/json',
    });
  
    formData.append('file', jsonBlob, fileName);
  
    axios
      .post('http://localhost:5000/copyfile', formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      const pdfData = new FormData();
  pdfData.append('pdf_file', selectedFile);
  axios.post('http://localhost:5000/copypdf', pdfData)
    .then((response) => {
      console.log(response.data);

      // Call the zipdossier function after the PDF file is uploaded
      
    })
    
    .catch((error) => {
      console.log(error);
    });
    axios.get('http://localhost:5000/zipfolder')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
    axios.get('http://localhost:5000/copydossier')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
     
      
    axios.get('http://localhost:5000/')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });

Swal.fire({
  icon: "success",
  title: "Succès !",
        text: 'The project instance is well generated.',
      });

  }
 
 
  
  
  
  
  
  
  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please upload a valid PDF file.',
      });
    }
  }

  function handleUpload() {
    // Ici vous pouvez effectuer l'envoi du fichier PDF vers votre serveur ou faire autre chose avec le fichier sélectionné
    console.log(selectedFile);
  }

  return (
    <div className='aa'>
      <h2>JSON OUTPUT PRETTY</h2>
      <div className='lkol'>
      
        <div className='input'>
          <label htmlFor="images" className="drop-container">
            <span className="drop-title">Upload JSON</span>
           
            <input type="file" id="images" onChange={handleFileUpload} accept="image/*" required />
          </label>
          

        </div>
        <div className='input1'><label htmlFor="images1" className="drop-container">
            <span className="drop-title">Upload PDF</span>
           
            <input type="file" id="images1" onChange={ handleFileChange} accept="image/*" required />
          </label></div>
        
        <div className='output'>
          
          <div className="scrollable-div">
            {error && <div className="error">{error}</div>}
            {jsonData && <JsonPrettier jsonData={jsonData} />}
          </div>
        </div>
        <div className='button1'>
          <button className="button" onClick={handleClick}>Generate </button>
        
        
      <a href="http://localhost:5000/downloadzip" download>
  <button className="button">Download</button>
</a>
    </div>
        
      </div>
    </div>
  );
};

export default App;
