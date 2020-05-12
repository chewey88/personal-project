import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { fetchComments } from "../../ducks/reducer";
import Comments from "../Comments/Comments";
import GoogleMapReact from "google-map-react";
import "./CentralUtah.css";
import BlueMapIcon from "../../Images/BlueMapIcon.svg";
import RedMapIcon from "../../Images/RedMapIcon.svg";

const CentralUtah = ({ comments, fetchComments }) => {
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

  const centralTrails = trails
    ? trails.filter((trail) => {
        if (trail.trail_region === "central") {
          return true;
        }
        return false;
      })
    : [];

  const centralComments = comments
    ? comments.filter((comm) => {
        if (comm.comment_region === "central") {
          return true;
        }
        return false;
      })
    : [];

  return (
    <div className="central-body">
      <div className="central-top">
        <div className="info-contain">
          {centralTrails.map((trail) => {
            return (
              <div
                className="info-cards"
                onMouseEnter={() => setSelectedTrail(trail.trail_id)}
                onMouseLeave={() => setSelectedTrail(null)}
              >
                <div> Name: {trail.trail_name} </div>
                <div> Miles: {trail.trail_length} </div>
                <div> Difficulty: {trail.trail_difficulty} </div>
                <div> Rocks and Minerals: {trail.mineral_name} </div>
                <div> Details: {trail.trail_discrip} </div>
                <div className="img-contain">
                  <img className="trail-img" src={trail.trail_img} />
                  <img className="malachite-img" src={trail.mineral_img} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="map-central">
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
            {centralTrails.map((trail) => (
              <MapMarker
                lat={trail.trail_lat}
                lng={trail.trail_long}
                id={trail.trail_id}
              />
            ))}
          </GoogleMapReact>
        </div>
      </div>

      <div className="central-comment-container">
        <Comments comments={centralComments} region={"central"} />
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
})(CentralUtah);
