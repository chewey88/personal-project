import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchComments} from '../../ducks/reducer'
import axios from 'axios'
import Comments from '../Comments/Comments'

const NorthernUtah = ({comments, fetchComments}) => {

    useEffect(() => {
        axios.get('/api/comments').then(res => {
            fetchComments(res.data)
            // console.log(res)
        })
    }, [])  
    
    const northernComments = comments ? comments.filter(comm => {
        if(comm.comment_region === 'northern'){
            return true
        }
        return false
    }) : []

 
    return (
        <div>
            <Comments comments={northernComments} region={'northern'} />
        </div>

        )
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

export default connect(mapStateToProps, {fetchComments})(NorthernUtah)
