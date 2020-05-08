import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import "./Home.css";
import MapIcon from "../../Images/MapIcon.svg";

const MapMarker = ({ text }) => (
  <div>
    {text}
    <img src={MapIcon} />
  </div>
);

function Home() {
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    axios.get("/api/trails").then((res) => {
      setTrails(res.data);
    });
  }, []);

  return (
    <div className="home-body">
      Home
      <div className="map-home">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={{
            lat: 39.2683,
            lng: -111.6369,
          }}
          defaultZoom={6.5}
        >
          {trails.map((trail) => (
            <MapMarker
              lat={trail.trail_lat}
              lng={trail.trail_long}
              // text={trail.trail_name}
            />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  );
}
export default Home;
