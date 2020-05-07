import React, {useEffect, useState} from 'react'
import GoogleMapReact from 'google-map-react'
import axios from 'axios'
import './Home.css'

const MapMarker = ({ text }) => 
<div>
    {text}
    <img src='../../Images/MapIcon.jpg'/>
</div>

function Home() {
    const [trails, setTrails] = useState([])

    useEffect(() =>{
        axios.get('/api/trails').then((res) => {setTrails(res.data)})
    })

  console.log(process.env.REACT_APP_GOOGLEMAPSAPIKEY)  
return (
<div className='home-body'>Home
<div style={{ height: '400px', width: '400px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
          defaultCenter={{
            lat: 39.2683,
            lng: -111.6369}}
          defaultZoom={6}
        >
          {trails.map((trail) => (<MapMarker
            lat={trail.trail_lat}
            lng={trail.trail_long}
            text={trail.trail_name}
          />))}
        </GoogleMapReact>
      </div>
</div>

)
}
export default Home