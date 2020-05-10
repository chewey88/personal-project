import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import "./Home.css";
import BlueMapIcon from "../../Images/BlueMapIcon.svg";
import RedMapIcon from "../../Images/RedMapIcon.svg";

function Home() {
  const [trails, setTrails] = useState([]);
  const [selectedTrail, setSelectedTrail] = useState(null);

  useEffect(() => {
    axios.get("/api/trails").then((res) => {
      setTrails(res.data);
    });
  }, []);
  const MapMarker = (trail) => {
    const { text, id } = trail;
    return (
      <div className={"map-marker"}>
        <img
          className="pin"
          src={selectedTrail === id ? RedMapIcon : BlueMapIcon}
        />
      </div>
    );
  };

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
              id={trail.trail_id}
            />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  );
}
export default Home;
