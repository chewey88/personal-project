import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchComments } from "../../ducks/reducer";
import axios from "axios";
import Comments from "../Comments/Comments";
import GoogleMapReact from "google-map-react";
import "./NorthernUtah.css";
import BlueMapIcon from "../../Images/BlueMapIcon.svg";
import RedMapIcon from "../../Images/RedMapIcon.svg";

const NorthernUtah = ({ comments, fetchComments }) => {
  const [trails, setTrails] = useState([]);
  const [selectedTrail, setSelectedTrail] = useState(null);

  useEffect(() => {
    axios.get("/api/comments").then((res) => {
      fetchComments(res.data);
    });
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

  const northernTrails = trails
    ? trails.filter((trail) => {
        if (trail.trail_region === "northern") {
          return true;
        }
        return false;
      })
    : [];

  const northernComments = comments
    ? comments.filter((comm) => {
        if (comm.comment_region === "northern") {
          return true;
        }
        return false;
      })
    : [];

  return (
    <div className="northern-body">
      <div className="northern-top">
        <div className="info-contain">
          {northernTrails.map((trail) => {
            return (
              <div
                className="info-cards"
                onMouseEnter={() => setSelectedTrail(trail.trail_id)}
                onMouseLeave={() => setSelectedTrail(null)}
              >
                <div> Name: {trail.trail_name} </div>
                <div> Miles: {trail.trail_length} </div>
                <div> Difficulty: {trail.trail_difficulty} </div>
                <div> Rocks and Minerals: {trail.trail_minerals} </div>
                <div> Details: {trail.trail_discrip} </div>
              </div>
            );
          })}
        </div>
        <div className="map-northern">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
            }}
            defaultCenter={{
              lat: 39.5586,
              lng: -111.8619,
            }}
            defaultZoom={7.7}
          >
            {northernTrails.map((trail) => (
              <MapMarker
                lat={trail.trail_lat}
                lng={trail.trail_long}
                id={trail.trail_id}
              />
            ))}
          </GoogleMapReact>
        </div>
      </div>

      <div className="northern-comments">
        <Comments comments={northernComments} region={"northern"} />{" "}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
  };
};

export default connect(mapStateToProps, {
  fetchComments,
})(NorthernUtah);
