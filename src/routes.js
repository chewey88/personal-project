import {Route, Switch} from 'react-router-dom'
import React from 'react'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import NorthernUtah from './Components/NorthernUtah/NorthernUtah'
import CentralUtah from './Components/CentralUtah/CentralUtah'
import SouthernUtah from './Components/SouthernUtah/SouthernUtah'

export default (
<Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/login' component={Login}/>
    <Route path='/register' component={Register}/>
    <Route path='/northernUtah' component={NorthernUtah}/>
    <Route path='/centralUtah' component={CentralUtah}/>
    <Route path='/southernUtah' component={SouthernUtah}/>
</Switch>
)