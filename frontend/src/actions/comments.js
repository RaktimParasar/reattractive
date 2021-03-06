import api from '../utils/api';
import { 
    GET_COMMENTS, 
    COMMENT_ERROR, 
    VOTE_COMMENTS, 
    DELETE_COMMENT,
    ADD_COMMENT,
    EDIT_COMMENT,
    GET_SINGLE_COMMENT,
} from './types';

// Get all comments of a post
export const getComments = id => async dispatch => {
    try {
        const res = await api.get(`/posts/${id}/comments`);

        dispatch({
            type: GET_COMMENTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: COMMENT_ERROR,
            payload: { msg: err.message }
        })
    }
};

// Vote comments
export const voteComments = (id, vote) => async dispatch => {
    try {
        const res = await api.post(`/comments/${id}`, { option: vote });

        dispatch({
            type: VOTE_COMMENTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: COMMENT_ERROR,
            payload: { msg: err.message }
        })
    }
};

// Delete post
export const deleteComment = id => async dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone')) {
        try {
            const res = await api.delete(`/comments/${id}`);
    
            dispatch({
                type: DELETE_COMMENT,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: COMMENT_ERROR,
                payload: { msg: err.message }
            })
        }
    }
};

// Add comment
export const addComment = data => async dispatch => {
    try {
        const res = await api.post('/comments', data);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: COMMENT_ERROR,
            payload: { msg: err.message }
        })
    }
};

// Get Single Comment
export const getSingleComment = id => async dispatch => {
    try {
        const res = await api.get(`/comments/${id}`)
        
        dispatch({
            type: GET_SINGLE_COMMENT,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: COMMENT_ERROR,
            payload: { msg: err.message }
        })
    }
};

// Edit comment
export const editComment = (data, id) => async dispatch => {
    try {
        const res = await api.put(`/comments/${id}`, data);

        dispatch({
            type: EDIT_COMMENT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: COMMENT_ERROR,
            payload: { msg: err.message }
        })
    }
};

