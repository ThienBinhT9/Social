import { createSlice } from '@reduxjs/toolkit'

export const AuthSlice = createSlice({
    name:"auth",
    initialState:{
        login:{
            currentUser:null,
            isFetching:false,
            error:false,
        },
        register:{
            error: false,
            isFetching: false,
            success: false,
        },
        logout:{
            isFetching:false,
            error:false
        },
        active:{
            activeNav:' ',
            activeNavProfile:' '
        },
        mode:'light'

    },
    reducers:{

        //LOGIN
        loginStart:(state) => {
            state.login.isFetching = true
        },
        loginSuccess:(state, action) => {
            state.login.isFetching = false
            state.login.error = false
            state.login.currentUser = action.payload;
        },
        loginFailed:(state) => {
            state.login.isFetching = false
            state.login.error = true
        },

        //REGISTER
        registerStart:(state) => {
            state.register.isFetching = true
        },
        registerSuccess:(state) => {
            state.register.isFetching = false
            state.register.error = false
            state.register.success = true
        },
        registerFailed:(state) => {
            state.register.isFetching = false
            state.register.error = true
            state.register.success = false
        },

        //LOGOUT
        logoutStart:(state) => {
            state.logout.isFetching = true
        },
        logoutSuccess:(state) => {
            state.logout.isFetching = false
            state.logout.error = false
            state.login.currentUser = null
            state.active.activeNav = ' '
        },
        logoutFailed:(state) => {
            state.logout.isFetching = false
            state.logout.error = true
        },

        //ACTIVE NAV
        activeNav:(state, action) => {
            state.active.activeNav = action.payload
        },

        //ACTIVE NAV PROFILE
        activeNavProfile:(state, action) => {
            state.active.activeNavProfile = action.payload
        },

        //MODE
        setMode:(state, action) => {
            state.mode = action.payload
        }
    }
})

export const { loginStart, loginSuccess, loginFailed, registerStart, registerSuccess, registerFailed, logoutStart,logoutSuccess,logoutFailed,activeNav, setMode, activeNavProfile } = AuthSlice.actions
export default AuthSlice.reducer