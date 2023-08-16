import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import './auth.scss'
import Button from '../../components/Button'
import { login } from '../../redux/apiRequests'
import logo from '../../assets/images/logo.png'
import Loading from '../../components/Loading/loadingSpinner'

function Login() {

    const {isFetching, error} = useSelector(state => state.auth.login)
    const user = useSelector(state => state.auth.login?.currentUser)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = () => {
        const data = {
            email,
            password
        }

        login(data, dispatch, navigate)
    }

    useEffect(() => {
        if(user?.accessToken) {
            return navigate('/') 
        }
    },[])

    return (
        <div className="auth__wrapper">
            {isFetching && <Loading />}
            <div className="auth__container">
                <div className="auth__logo">
                    <img src={logo} alt="logo"/>
                </div>
                <div className="auth__content">
                    <div className="auth__form">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="auth__form">
                        <label htmlFor="password">Mật khẩu</label>
                        <input type="password" id="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    {error && <p style={{color:"red"}}>Tài khoản không tồn tại</p>}
                    <div className="auth__submit">
                        <Button className="auth__submit__btn" text to="/register">Đăng kí</Button>
                        <Button className="auth__submit__btn" primary onClick={handleLogin} >Đăng nhập</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;