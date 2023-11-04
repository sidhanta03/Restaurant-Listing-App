// Update.js
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const [restaurant, setRestaurant] = useState({
    name: "",
    address: "",
    contact: "",
  });
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const restaurantId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setRestaurant((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8000/restaurants/${restaurantId}`, restaurant);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Restaurant</h1>
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
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all restaurants</Link>
    </div>
  );
};

export default Update;
