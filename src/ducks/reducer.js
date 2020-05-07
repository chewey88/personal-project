// import axios from 'axios'

const initialState = {
    user: {},
    isLoggedIn: false
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const FETCH_COMMENT = 'FETCH_COMMENT'
// const GET_USER = 'GET_USER'

export function loginUser(user){
    return{
        type: LOGIN_USER,
        payload: user
    }
}

export function logoutUser(){
    return {
        type: LOGOUT_USER,
        payload: initialState
    }
}

// export function getUser(user){
//     return {
//         type:GET_USER,
//         payload: user
//     }
// }

export function fetchComments(comments){
    return{
        type: FETCH_COMMENT,
        payload: comments
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case LOGIN_USER:
            return {...state, user: action.payload, isLoggedIn: true}
        case LOGOUT_USER:
            return {...state, ...action.payload}
        case FETCH_COMMENT:
            console.log('RUNNING', action.payload)
            return {...state, comments: action.payload}
        default:
            return state    

    }
}