import classNames from "classnames/bind";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from '../profile.module.scss'
import Model, {ModelContent} from "../../../components/Model";
import createAxios from '../../../utils/axiosInstance'
import { loginSuccess } from "../../../redux/authSlice";
import Button from "../../../components/Button";
import {faMoon, faUser, faEnvelope, faNewspaper, faHandshake} from '@fortawesome/free-regular-svg-icons'
import {faRightFromBracket, faSearch } from "@fortawesome/free-solid-svg-icons";
import { logout } from '../../../redux/apiRequests'
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles)

function SettingProfile({setShowModelSetting}) {

    const user = useSelector(state => state.auth.login.currentUser)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)


    const handleCloseModel = () => {
        setShowModelSetting(false)
    }

    const handleLogout = () => {
        logout(user?._id, user?.accessToken, dispatch, navigate, axiosJWT)
    }

    return ( 
        <>
            <Model>
                <ModelContent title={'Cài đặt'} rightToLeft className={cx('model__setting__pc')} onClose={handleCloseModel}>
                    <Button className={cx('model__setting__item')} iconLeft={faMoon}>Đổi chế độ</Button>
                    <Button className={cx('model__setting__item')} iconLeft={faSearch}>Tìm kiếm</Button>
                    <Button className={cx('model__setting__item')} iconLeft={faUser}>Cài đặt theo dõi</Button>
                    <Button className={cx('model__setting__item')} iconLeft={faEnvelope}>Kho lưu trữ</Button>
                    <Button className={cx('model__setting__item')} iconLeft={faNewspaper}>Quản lý bài viết</Button>
                    <Button className={cx('model__setting__item')} iconLeft={faHandshake}>Trung tâm hỗ trợ</Button>
                    <Button className={cx('model__setting__item')} iconLeft={faRightFromBracket} onClick={handleLogout}>Đăng xuất</Button>
                </ModelContent>
            </Model>

        </>
     );
}

export default memo(SettingProfile);