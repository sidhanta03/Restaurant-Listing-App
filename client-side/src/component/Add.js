// Add.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const [restaurant, setRestaurant] = useState({
    name: "",
    address: "",
    contact: "", 
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setRestaurant((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/restaurants", restaurant);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Add New Restaurant</h1>
      <input
        type="text"
        placeholder="Restaurant name"
        name="name"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Restaurant address"
        name="address"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Restaurant contact"
        name="contact"
        onChange={handleChange}
      />
      <button  onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See all restaurants</Link>
    </div>
  );
};

export default Add;
