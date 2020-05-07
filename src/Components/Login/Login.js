import React, {useState} from 'react'
import axios from 'axios'
// import {Link} from 'react-router-dom'
import {loginUser} from '../../ducks/reducer'
import {connect} from 'react-redux'
import './Login.css'

function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

     

    const handleLogin = () => {
        const body = {
            username: username,
            password: password
        }
        axios.post('/auth/login', body)
        .then(res => {
            props.loginUser(res.data)
            props.history.push('/')

        }).catch((err) => alert('Username or Password Incorrect'))
    }

    
        return (
            <div className='login-body'>
                <div className='input-container'>
                    <input
                        maxLength='50'
                        placeholder='Enter Username'
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        />
                    <input 
                        maxLength='100'
                        placeholder='Enter Password'
                        onChange={(e) => {
                        setPassword(e.target.value)
                        }}
                        />
                    <button
                        onClick={() => {
                            handleLogin()
                        }}>Login</button>
                    
                </div>
            </div>
        )
    }

    export default connect(null, {loginUser})(Login)