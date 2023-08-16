import { memo, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import { faUserPlus, faEllipsisH, faPen, faUserCheck } from '@fortawesome/free-solid-svg-icons'

import styles from '../profile.module.scss'
import Button from "../../../components/Button";
import { getUser , addRemoveFollow} from "../../../redux/apiRequests";
import createAxios from "../../../utils/axiosInstance";
import { loginSuccess } from "../../../redux/authSlice";
import NavProfile from "./nav";
import Loading from '../../../components/Loading/loadingSpinner'
import EditProfile from "./edit";
import SettingProfile from './setting';
const cx = classNames.bind(styles)


function HeaderProfile() {

    const user = useSelector(state => state.auth.login.currentUser)
    const person = useSelector(state => state.user.getUser.user)
    const { isFetching } = useSelector(state => state.user.getUser)

    const dispatch = useDispatch()
    const { userId } = useParams()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)
    console.log(userId);

    const [showModel, setShowModel] = useState(false)
    const [showModelSetting, setShowModelSetting] = useState(false)

    const handleAddRemoveFriend = () => {
        const data = {
            userId:user?._id
        }
        addRemoveFollow(data, userId, user?.accessToken, dispatch, axiosJWT)
    }

    const handleShowModelEdit = () => {
        setShowModel(true)
    }

    const handleShowModelSetting = () => {
        setShowModelSetting(true)
    }

    useEffect(() => {
        getUser(userId, user?.accessToken, dispatch, axiosJWT)
    },[userId])

    return ( 

        <>
            {isFetching && <Loading />}
            {!isFetching && (
                <div className={cx('header')}>
                    <div className={cx('coverImage')}>
                        <img src={person?.coverImage} alt="coverImage"/>
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('avatar')}>
                            <img src={person?.avatar} alt="avatar"/>
                        </div>
                        <div className={cx('description')}>
                            <div className={cx('actions__name','desc__section')}>
                                <span className={cx('name')}>{person?.username}</span>
                                <span className={cx('btn-edit')} onClick={handleShowModelEdit}>Chỉnh sửa trang cá nhân</span>
                            </div>
                            <div className={cx('status-follow','desc__section')}>
                                <div className={cx('status-follow__child')}>
                                    <p><span>32</span> bài viết</p>
                                    <p><span>{person?.friends.length}</span> Bạn bè</p>
                                </div>
                                <div className={cx('status-follow__child')}>
                                    <p><span>{person?.followers.length}</span> người theo dõi</p>
                                    <p>Đang theo dõi <span>{person?.followings.length}</span> người dùng</p>
                                </div>
                            </div>
                            <div className={cx('interact')}>
                                {user?._id !== person?._id && (
                                    <div style={{display:'flex', alignItems:'center'}}>
                                        {!person?.followers.includes(user?._id) && !person?.friends.includes(user?._id) && <Button className={cx('interact__btn')} iconLeft={faUserPlus} primary onClick={handleAddRemoveFriend}>Thêm bạn bè</Button>}
                                        {person?.followers.includes(user?._id) && !person?.friends.includes(user?._id) &&<Button className={cx('interact__btn')} iconLeft={faUserCheck} primary onClick={handleAddRemoveFriend}>Đã gửi lời mời</Button>}
                                        {person?.friends.includes(user?._id) && <Button className={cx('interact__btn')} iconLeft={faUserCheck} primary>Bạn bè</Button>}
                                        <Button className={cx('interact__btn','interact__btn--mes')} iconLeft={faFacebookMessenger}>Nhắn tin</Button>
                                    </div>
                                )}
                                {user?._id === person?._id && (
                                    <div className={cx('interact__mobile')}>
                                          <Button className={cx('interact__btn','interact__btn__setting')} iconLeft={faPen} primary onClick={handleShowModelEdit}>Chỉnh sửa trang cá nhân</Button>
                                        <Button className={cx('interact__btn','interact__btn__options')} iconLeft={faEllipsisH} onClick={handleShowModelSetting}></Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <NavProfile />
                </div>
            )}

            {showModel && (
                <EditProfile setShowModel={setShowModel}/>
            )}
            {showModelSetting && (
                <SettingProfile setShowModelSetting={setShowModelSetting}/>
            )}
        </>
            
    );
}

export default memo(HeaderProfile);