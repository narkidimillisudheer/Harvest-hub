// App.js
import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import ResultDisplay from './components/ResultDisplay';

const Ml = () => {
  const [result, setResult] = useState(null);

  const handleUpload = async (formData) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div>
      <UploadForm onUpload={handleUpload} />
      {result && <ResultDisplay result={result} />}
    </div>
  );
};

export default Ml;
