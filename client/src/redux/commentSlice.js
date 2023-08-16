import { createSlice } from '@reduxjs/toolkit'

export const CommentSlice = createSlice({
    name:'comment',
    initialState:{
        getComments:{
            comments:null,
            isFetching:false,
            error:false
        },
        createComment:{
            comment:null,
            isFetching:false,
            error:false
        },
        updateComment:{
            comment:null,
            isFetching:false,
            error:false
        },
        deleteComment:{
            comment:null,
            isFetching:false,
            error:false
        }
    },
    reducers:{
        //GET COMMENT
        getCommentStart:(state) => {
            state.getComments.isFetching = true
        },
        getCommentSuccess:(state, action) => {
            state.getComments.isFetching = false
            state.getComments.comments = action.payload
            state.getComments.error = false
        },
        getCommentFailed:(state) => {
            state.getComments.isFetching = false
            state.getComments.error = true
        },

        //CREATE COMMENT
        createCommentStart:(state) => {
            state.createComment.isFetching = true
        },
        createCommentSuccess:(state, action) => {
            state.createComment.isFetching = false
            state.createComment.comment = action.payload
            state.createComment.error = false
        },
        createCommentFailed:(state) => {
            state.createComment.isFetching = false
            state.createComment.error = true
        },

        //DELETE COMMENT
        deleteCommentStart:(state) => {
            state.deleteComment.isFetching = true
        },
        deleteCommentSuccess:(state, action) => {
            state.deleteComment.isFetching = false
            state.deleteComment.comment = action.payload
            state.deleteComment.error = false
        },
        deleteCommentFailed:(state) => {
            state.deleteComment.isFetching = false
            state.deleteComment.error = true
        },

        //UPDATE COMMENT
        updateCommentStart:(state) => {
            state.updateComment.isFetching = true
        },
        updateCommentSuccess:(state, action) => {
            state.updateComment.isFetching = false
            state.updateComment.comment = action.payload
            state.updateComment.error = false
        },
        updateCommentFailed:(state) => {
            state.updateComment.isFetching = false
            state.updateComment.error = true
        },
    }
})

export const {getCommentStart, getCommentSuccess, getCommentFailed, createCommentStart, createCommentSuccess, createCommentFailed, updateCommentStart, updateCommentSuccess, updateCommentFailed, deleteCommentStart, deleteCommentSuccess, deleteCommentFailed} = CommentSlice.actions
export default CommentSlice.reducer
