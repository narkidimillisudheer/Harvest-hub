import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function AddCropForm() {
  const [id, setId] = useState("");
  const [formData, setFormData] = useState({
    cropName: "",
    quantity: "",
    price: "",
    file: null,
    id: "",
  });
  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const id = decodedToken.id;
      console.log(id);
      setId(id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("cropName", formData.cropName);
      formDataToSend.append("quantity", formData.quantity);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("file", formData.file);
      formDataToSend.append("id", id);

      await axios.post("http://localhost:3001/addCrop", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("crop is added successfully");
    } catch (error) {
      console.error("Error:", error.response.data);
      alert("error is occurred.please try again");
    }
  };
  return (
    <>
      <style>
        {`
          .main9324{
            height:60vh;
            width:1280px;
            display:flex;
            justify-content:center;
            align-items:center;
          }
          .card {
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 20px;
            width: 400px;
            margin: 0 auto;
            margin-top:20px;
          }

          .formContainer h2 {
            font-size: 24px;
            margin-bottom: 20px;
          }

          .formContainer form {
            display: flex;
            flex-direction: column;
          }

          .formContainer label {
            margin-bottom: 8px;
          }

          .formContainer input[type="text"],
          .formContainer input[type="number"],
          .formContainer input[type="file"] {
            padding: 8px;
            margin-bottom: 16px;
          }

          .formContainer button {
            padding: 10px 20px;
            background-color: green;
            color: white;
            border: none;
            cursor: pointer;
          }
        `}
      </style>
      <div className="main9324">
        <div className="card">
          <div className="formContainer">
            <h2>Add Your Product</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="cropName">Product Name:</label>
                <input
                  type="text"
                  id="cropName"
                  name="cropName"
                  placeholder="Enter product Name"
                  value={formData.cropName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  placeholder="in KG'S"
                />
              </div>
              <div>
                <label htmlFor="price">price per Kg:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="Price per kg"
                />
              </div>
              <div>
                <label htmlFor="image">Image:</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  name="file"
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCropForm;
