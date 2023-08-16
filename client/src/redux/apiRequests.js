import axios from 'axios'
import {
    registerStart,
    registerSuccess,
    registerFailed,
    loginStart,
    loginSuccess,
    loginFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed
} from './authSlice'
import {
    getUserStart,
    getUserSuccess,
    getUserFailed,
    addRemoveStart,
    addRemoveSuccess,
    addRemoveFailed,
    updateUserStart,
    updateUserSuccess,
    updateUserFailed,
    acceptUserStart,
    acceptUserSuccess,
    acceptUserFailed,
    ignoreSuccess
} from './userSlice'
import {
    getMyPostStart,
    getMyPostSuccess,
    getMyPostFailed,
    createPostStart,
    createPostSuccess,
    createPostFailed,
    updatePostStart,
    updatePostSuccess,
    updatePostFailed,
    deletePostStart,
    deletePostSuccess,
    deletePostFailed
} from './postSlice'
import {
    getCommentStart,
    getCommentSuccess,
    getCommentFailed,
    createCommentStart,
    createCommentSuccess,
    createCommentFailed
} from './commentSlice'


//AUTH
export const register = async(data, dispatch, navigate) => {
    try {
        dispatch(registerStart())
        await axios.post('/auth/register', data);
        dispatch(registerSuccess())
        navigate('/login')
    } catch (error) {
        dispatch(registerFailed())
    }
}

export const login = async(data, dispatch, navigate) => {
    try {
        dispatch(loginStart())
        const res = await axios.post('/auth/login', data);
        dispatch(loginSuccess(res.data))
        navigate('/')
    } catch (error) {
        dispatch(loginFailed())
    }
}

export const logout = async(id, accessToken, dispatch, navigate, axiosJWT) => {
    try {
        dispatch(logoutStart())
        await axiosJWT.post('/auth/logout', id, {
            headers:{
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(logoutSuccess())
        navigate('/login')
    } catch (error) {
        dispatch(logoutFailed())
    }
}


//USER
export const getUser = async(id, accessToken, dispatch, axiosJWT) => {
    try {
        dispatch(getUserStart())
        const res = await axiosJWT.get(`/users/${id}`, {
            headers:{
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(getUserSuccess(res.data))
    } catch (error) {
        dispatch(getUserFailed())
    }
}

export const addRemoveFollow = async(userId, id, accessToken, dispatch, axiosJWT) => {
    try {
        dispatch(addRemoveStart())
        const res = await axiosJWT.put(`/users/${id}/follow`, userId, {
            headers:{
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(addRemoveSuccess(res.data.updatePerson))
    } catch (error) {
        dispatch(addRemoveFailed())
    }
}

export const updateUser = async(userId, data, accessToken, dispatch, axiosJWT) => {
    try {
        dispatch(updateUserStart())
        const res = await axiosJWT.put(`/users/${userId}`, data, {
            headers:{
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(updateUserSuccess(res.data))
    } catch (error) {
        dispatch(updateUserFailed())
    }
}

export const acceptFriends = async(userId, data, dispatch, accessToken, axiosJWT) => {
    try {
        dispatch(acceptUserStart())
        const res = await axiosJWT.put(`/users/${userId}/accept`, data, {
            headers:{
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(acceptUserSuccess(res.data))
    } catch (error) {
        dispatch(acceptUserFailed())
        console.log('Lỗi');
    }
}

export const ignoreFriends = async(userId, data, dispatch, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put(`/users/${userId}/ignore`, data, {
            headers:{
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(ignoreSuccess(res.data))
    } catch (error) {
        console.log('Lỗi');
    }
}

//POST
export const createPost = async(userId, data, accessToken, dispatch, axiosJWT) => {
    try {
        dispatch(createPostStart())
        const res = await axiosJWT.post(`/posts/${userId}/create`, data, {
            headers:{
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(createPostSuccess(res.data))
    } catch (error) {
        dispatch(createPostFailed())
    }
}

export const getMyPost = async(page, userId, accessToken, dispatch, axiosJWT) => {
    try {
        dispatch(getMyPostStart())
        const res = await axiosJWT.get(`/posts/${userId}?page=${page}`, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(getMyPostSuccess(res.data))
    } catch (error) {
        dispatch(getMyPostFailed())
    }
}

export const likePost = async(userId, id, accessToken, dispatch, axiosJWT) => {
    try {
        dispatch(updatePostStart())
        const res = await axiosJWT.put(`/posts/${id}/like`, userId, {
            headers:{
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(updatePostSuccess(res.data))
    } catch (error) {
        dispatch(updatePostFailed())
    }
}

export const savePost = async(userId, id, accessToken, dispatch, axiosJWT) => {
    try {
        dispatch(updatePostStart())
        const res = await axiosJWT.put(`/posts/${id}/save`, userId, {
            headers:{
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(updatePostSuccess(res.data))
    } catch (error) {
        dispatch(updatePostFailed())
    }
}

export const deletePost = async(userId, id, accessToken, dispatch, axiosJWT ) => {
    try {
        dispatch(deletePostStart())
        const res = await axiosJWT.delete(`/posts/${id}/${userId}/delete`, {
            headers:{
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(deletePostSuccess(res.data))
    } catch (error) {
        dispatch(deletePostFailed())
    }
}

//COMMENT
export const getComment = async(postId, accessToken, dispatch, axiosJWT) => {
    try {
        dispatch(getCommentStart())
        const res = await axiosJWT.get(`/comments/${postId}`, {
            headers:{
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(getCommentSuccess(res.data))
    } catch (error) {
        dispatch(getCommentFailed())
    }
}

export const createComment = async(postId, data, accessToken, dispatch, axiosJWT) => {
    try {
        dispatch(createCommentStart())
        const res = await axiosJWT.post(`/comments/${postId}/create`, data, {
            headers:{
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(createCommentSuccess(res.data))
    } catch (error) {
        dispatch(createCommentFailed())
    }
}