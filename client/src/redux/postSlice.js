import {createSlice} from '@reduxjs/toolkit'

export const PostSlice = createSlice({
    name:'post',
    initialState:{
        getMyPost:{
            posts:[],
            isFetching:false,
            error:false
        },

        getHomePost:{
            posts:null,
            isFetching:false,
            error:false
        },

        updatePost:{
            post:null,
            isFetching:false,
            error:false
        },

        createPost:{
            isFetching:false,
            error:false,
            post:null
        },

        deletePost:{
            isFetching:false,
            error:false,
            post:null
        }
    },
    reducers:{
        //CREATE
        createPostStart:(state) => {
            state.createPost.isFetching = true
        },
        createPostSuccess:(state, action) => {
            state.createPost.isFetching = false
            state.createPost.post = action.payload
            state.createPost.error = false
        },
        createPostFailed:(state) => {
            state.createPost.error = true
            state.createPost.isFetching = false
        },

        //UPDATE
        updatePostStart:(state) => {
            state.updatePost.isFetching = true
        },
        updatePostSuccess:(state, action) => {
            state.updatePost.isFetching = false
            state.updatePost.post = action.payload
            state.updatePost.error = false
        },
        updatePostFailed:(state) => {
            state.updatePost.error = true
            state.updatePost.isFetching = false
        },

        //DELETE
        deletePostStart:(state) => {
            state.deletePost.isFetching = true
        },
        deletePostSuccess:(state, action) => {
            state.deletePost.isFetching = false
            state.deletePost.post = action.payload
            state.deletePost.error = false
        },
        deletePostFailed:(state) => {
            state.deletePost.error = true
            state.deletePost.isFetching = false
        },

        //GET MY POST
        getMyPostStart:(state) => {
            state.getMyPost.isFetching = true
        },
        getMyPostSuccess:(state, action) => {
            state.getMyPost.isFetching = false
            state.getMyPost.posts = action.payload
            state.getMyPost.error = false
        },
        getMyPostFailed:(state) => {
            state.getMyPost.error = true
            state.getMyPost.isFetching = false
        },

        //GET HOME POST
        getHomePostStart:(state) => {
            state.getHomePost.isFetching = true
        },
        getHomePostSuccess:(state, action) => {
            state.getHomePost.isFetching = false
            state.getHomePost.posts = action.payload
            state.getHomePost.error = false
        },
        getHomePostFailed:(state) => {
            state.getHomePost.error = true
            state.getHomePost.isFetching = false
        }
    }
})

export const {getMyPostStart, getMyPostSuccess, getMyPostFailed, getHomePostStart, getHomePostSuccess, getHomePostFailed, createPostStart, createPostSuccess, createPostFailed, deletePostStart, deletePostSuccess, deletePostFailed, updatePostStart, updatePostSuccess, updatePostFailed} = PostSlice.actions
export default PostSlice.reducer