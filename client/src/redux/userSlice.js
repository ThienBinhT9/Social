import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
    name:'user',
    initialState:{
        getUser:{
            user:null,
            isFetching:false,
            error:false
        },
        addRemoveFollow:{
            isFetching:false,
            error:false
        },
        updateUser:{
            isFetching:false,
            error:false
        },
        acceptFriend:{
            user:null,
            isFetching:false,
            error:false
        },
        ignoreFriend:{
            user:null,
        }
    },
    reducers:{

        //GET A USER
        getUserStart:(state) => {
            state.getUser.isFetching = true
        },
        getUserSuccess:(state, action) => {
            state.getUser.isFetching = false
            state.getUser.user = action.payload
            state.getUser.error = false
        },
        getUserFailed:(state) => {
            state.getUser.isFetching = false
            state.getUser.error = true
        },

        //ADD REMOVE FOLLOW
        addRemoveStart:(state) => {
            state.addRemoveFollow.isFetching = true
        },
        addRemoveSuccess:(state, action) => {
            state.addRemoveFollow.isFetching = false
            state.getUser.user = action.payload
            state.addRemoveFollow.error = false
        },
        addRemoveFailed:(state) => {
            state.addRemoveFollow.isFetching = false
            state.addRemoveFollow.error = true
        },

        //UPDATE USER
        updateUserStart:(state) => {
            state.updateUser.isFetching = true
        },
        updateUserSuccess:(state, action) => {
            state.updateUser.isFetching = false
            state.getUser.user = action.payload
            state.updateUser.error = false
        },
        updateUserFailed:(state) => {
            state.updateUser.isFetching = false
            state.updateUser.error = true
        },

        //ACCEPT FRIEND
        acceptUserStart:(state) => {
            state.acceptFriend.isFetching = true
        },
        acceptUserSuccess:(state, action) => {
            state.acceptFriend.isFetching = false
            state.acceptFriend.user = action.payload
            state.acceptFriend.error = false
        },
        acceptUserFailed:(state) => {
            state.acceptFriend.isFetching = false
            state.acceptFriend.error = true
        },

        //IGNORE FRIEND
        ignoreSuccess:(state, action) => {
            state.ignoreFriend.user = action.payload
        }

    }
})

export const { getUserStart, getUserSuccess, getUserFailed, addRemoveStart, addRemoveSuccess, addRemoveFailed, updateUserStart, updateUserSuccess, updateUserFailed, acceptUserStart, acceptUserSuccess, acceptUserFailed, ignoreSuccess} = UserSlice.actions
export default UserSlice.reducer