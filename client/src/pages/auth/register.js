import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './auth.scss'
import logo from '../../assets/images/logo.png'
import Button from '../../components/Button'
import Loading from '../../components/Loading/loadingSpinner'
import { register } from '../../redux/apiRequests'

function Register() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isFetching, error} = useSelector(state => state.auth.register)

    const formik = useFormik({
        initialValues:{
            email:"",
            username:"",
            password:"",
            confirmPassword:""
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(30, 'Tối đa 30 kí tự')
                .min(1, 'Tối thiểu 1 kí tự')
                .required('Bạn chưa nhập trường này'),
            email: Yup.string()
                .max(50, 'Tối đa 50 kí tự')
                .required('Bạn chưa nhập trường này')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập kiểu email'),
            password: Yup.string()
                .min(6, 'Tối thiểu 6 kí tự')
                .required('Bạn chưa nhập trường này'),
            confirmPassword: Yup.string()
                .required("Bạn chưa nhập trường này!")
                .oneOf([Yup.ref("password"), null],"Xác nhận mật khẩu chưa đúng!")
        }),
        onSubmit: (values) => {
            const newUser = {
                email:values.email,
                username:values.username,
                password:values.password
            }

            register(newUser, dispatch, navigate)
        }
    })
    
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
                        <input type="email" id="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange}/>
                        {formik.errors.email && <span className="auth__form__message">{formik.errors.email}</span>}
                    </div>
                    <div className="auth__form">
                        <label htmlFor="username">Tên</label>
                        <input type="text" id="username" placeholder="Họ và Tên" value={formik.values.username} onChange={formik.handleChange}/>
                        {formik.errors.username && <span className="auth__form__message">{formik.errors.username}</span>}
                    </div>
                    <div className="auth__form">
                        <label htmlFor="password">Mật khẩu</label>
                        <input type="password" id="password" placeholder="Mật khẩu" value={formik.values.password} onChange={formik.handleChange}/>
                        {formik.errors.password && <span className="auth__form__message">{formik.errors.password}</span>}
                    </div>
                    <div className="auth__form">
                        <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
                        <input type="password" id="confirmPassword" placeholder="Nhập lại mật khẩu" value={formik.values.confirmPassword} onChange={formik.handleChange}/>
                        {formik.errors.confirmPassword && <span className="auth__form__message">{formik.errors.confirmPassword}</span>}
                    </div>
                    {error && <p style={{color:"red"}}>Đăng kí thất bại. Rất có thể email đã được đăng kí trước đó</p>}
                    <div className="auth__submit">
                        <Button className="auth__submit__btn" text to='/login'>Đăng nhập</Button>
                        <Button className="auth__submit__btn" primary onClick={formik.handleSubmit}>Đăng kí</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;