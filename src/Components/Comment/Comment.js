import React, {useState} from 'react'
import axios from 'axios'
import {fetchComments} from '../../ducks/reducer'
import {connect} from 'react-redux'

function Comment({ comment, fetchComments }) {
    const [editMode, changeEditMode] = useState(false)
    const [commentToEdit, changeEditComment] = useState(comment.content)
    

    const editComment = () => {
        axios.put(`/api/comments/${comment.comment_id}`, {content: commentToEdit})
        .then(res => {
        fetchComments(res.data)
        changeEditMode(false)
        })
    }

    const deleteComment = () => {
        axios.delete(`/api/comments/${comment.comment_id}`)
        .then(res => {
            console.log('HI')
            fetchComments(res.data)
        })
    }

    return (
        <div>
            
            {editMode === true ? (
                <div>
                <input value={commentToEdit} onChange={(e) => changeEditComment(e.target.value)} />
                <button onClick={editComment}>Save</button>
                </div>
            ) : comment.content}
            <button onClick={()=> changeEditMode(!editMode)}>Edit</button>
            <button onClick={deleteComment}>Delete</button>
        </div>
    )
}
// const mapStateToProps = (state) => {
//     return {
//         comments: state.comments
//     }
// }

export default connect(null, {fetchComments})(Comment)

