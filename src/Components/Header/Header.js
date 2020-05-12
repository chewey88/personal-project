import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../ducks/reducer";
import axios from "axios";
import "./header.css";

function Header(props) {
  // const [search, setSearch] = useState('')

  // const handleSearch = () => {
  //     axios.get(`/api/search?${search}`)
  // }
  const handleLogout = () => {
    axios.delete("/auth/logout").then((res) => {
      props.logoutUser();
      props.history.push("/");
    });
  };
  console.log(props);
  return (
    <nav className="header-box">
      <h1>Utah's Best Hiking With RockHounding</h1>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/northernUtah">Northern Utah</Link>
        <Link to="/centralUtah">Central Utah</Link>
        <Link to="/southernUtah">Southern Utah</Link>
      </div>
      {/* <div className='search-bar'>
            <input 
                onChange={(e) => {
                    setSearch(e.target.value)
                }}
                type='text' 
                placeholder='Search a Rock or Mineral'
                maxLength='100'>                   
            </input>
        </div> */}
      {props.isLoggedIn ? (
        <button
          className="logout-button"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <div className="log-reg">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}

      {}
    </nav>
  );
}
const mapStateToProps = (state) => {
  return state;
};

export default withRouter(connect(mapStateToProps, { logoutUser })(Header));
