// Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchAllRestaurants = async () => {
      try {
        const res = await axios.get("http://localhost:8000/restaurants");
        setRestaurants(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllRestaurants();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/restaurants/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 style={{fontFamily: "poppins",color:"#000000"}}>Restaurant Listing Platform</h1>
      <div className="restaurants">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant">
            <h2>{restaurant.name}</h2>
            <p>Address:{restaurant.address}</p>
            <span>Contact: {restaurant.contact}</span>
            <button className="delete" onClick={() => handleDelete(restaurant.id)}>
              Delete
            </button>
            <button className="update">
              <Link
                to={`/update/${restaurant.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new restaurant
        </Link>
      </button>
    </div>
  );
};

export default Home;
