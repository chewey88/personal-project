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
      .
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
      <p className="home-statement">
        Utah is an extraordinary state for all things outdoors. With some of the
        most beautiful geologic wonders anywhere. Utah also is a Rockhounder's
        dream, with a large variety of rocks and minerals to collect and admire.
        The issue is that the great spots to get the best rocks and minerals are
        usually not to most "pretty" places to hike and the "famous" "pretty"
        places to hike tend to be boring for Rockhounders. This compilation of
        hikes and trails are great for both the scenic outdoor hiker and anyone
        who loves to admire fun rocks and minerals.
      </p>
    </div>
  );
}
export default Home;
