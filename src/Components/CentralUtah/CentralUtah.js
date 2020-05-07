import React, {useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {fetchComments} from '../../ducks/reducer'
import Comments from '../Comments/Comments'

const CentralUtah = ({comments, fetchComments}) => {
    useEffect(() => {
        axios.get('/api/comments').then(res => {
            fetchComments(res.data)
            console.log(res)
        })
    }, [])  
    
    const centralComments = comments ? comments.filter(comm => {
        if(comm.comment_region === 'central'){
            return true
        }
        return false
    }) : []

    return <div>
        <Comments comments={centralComments} region={'central'} />
    </div>
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

export default connect(mapStateToProps, {fetchComments})(CentralUtah)

