import axios from "axios"
import jwt_decode from 'jwt-decode'

const refreshToken = async () => {
    try {
        const res = await axios.post(`/auth/refresh`,{
            withCredentials:true
        })
        return res.data
    } catch (error) {
        console.log('Lỗi');
    }
}

const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create()

    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date()

            const decodedToken = jwt_decode(user?.accessToken)

            if(decodedToken.exp < date.getTime() / 1000){
                const accessToken = await refreshToken()
                const refreshUser = {
                    ...user,
                    accessToken
                }
                dispatch(stateSuccess(refreshUser))
                config.headers.token = `Bearer ${accessToken}`
            }
            return config
            
        },(err) => new Promise.reject(err)
    )

    return newInstance
}

export default createAxios
