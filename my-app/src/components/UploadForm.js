import { useState } from "react";

const UploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file); // Ensure 'file' key is appended correctly
      await onUpload(formData); // Pass the FormData object to handleUpload
    } else {
      console.error("No file selected.");
    }
  };

  return (
    <div style={formStyle}>
      <center>
        {" "}
        <h1 style={headerStyle}>Upload an Image</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleChange} style={inputStyle} />
          <button type="submit" style={buttonStyle}>
            Predict
          </button>
        </form>
      </center>
    </div>
  );
};

const formStyle = {
  textAlign: "center",
  margin: "20px auto",
  padding: "20px",
  borderRadius: "5px",
  height: "60vh",
  width: "1280px",
  display: "flex",
};

const headerStyle = {
  fontSize: "27px",
  marginBottom: "15px",
};

const inputStyle = {
  marginBottom: "10px",
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default UploadForm;
