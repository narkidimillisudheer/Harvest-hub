import React from 'react';

const ResultDisplay = ({ result }) => {
  const resultStyle = {
    backgroundColor: '#dbeadf',
    borderRadius: '5px',
    padding: '10px',
    height:'200px',
    width:'500px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    fontSize: '20px',
    color: '#280b0e',
    position:'absolute',
    left:'500px',
    top:'240px'
  };

  return (
    <div style={resultStyle}>
     <center> <h1>Prediction Result</h1></center>
      <div>
       <center>Your Crop is Affected With : {result.class_name}</center> 
      </div>
    </div>
  );
};

export default ResultDisplay;
