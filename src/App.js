import React from 'react';
import Header from './Components/Header/Header'
import routes from './routes'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './App.css';


function App(props) {
  return (
    <div className="App">
      {props.location.pathname === '/register' || props.location.pathname === '/login' ? null : <Header/>}
        {routes}
      
    </div>
  );
}

export default withRouter(App);
