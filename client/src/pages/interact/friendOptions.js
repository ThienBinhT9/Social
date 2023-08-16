import { useState } from "react";
import classNames from "classnames/bind";
import { faEllipsis, faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebookMessenger} from '@fortawesome/free-brands-svg-icons'
import { faRectangleXmark } from '@fortawesome/free-regular-svg-icons'

import styles from './interact.module.scss'
import Button from '../../components/Button'
import Model, { ModelContent } from '../../components/Model'
import { ignoreFriends } from '../../redux/apiRequests'
import { useDispatch, useSelector } from "react-redux";
import createAxios from "../../utils/axiosInstance";
import { loginSuccess } from "../../redux/authSlice";

const cx = classNames.bind(styles)

function FriendOptions({data}) {
    const word = data.username.split(" ")
    const username = word[word.length - 1]

    const user = useSelector(state => state.auth.login?.currentUser)

    const [showModel, setShowModel] = useState(false)

    const dispatch = useDispatch()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)

    const handleShowModelOption = (e) => {
        e.preventDefault()
        setShowModel(true)
    }

    const handleCloseModelOption = () => {
        setShowModel(false)
    }

    const handleDeleteFriend = () => {
        const dataId = {
            userId:data._id
        }
        ignoreFriends(user?._id, dataId, dispatch, user?.accessToken, axiosJWT)
        setShowModel(false)
    }

    return ( 
        <>
            <FontAwesomeIcon icon={faEllipsis} onClick={handleShowModelOption}/>
            {showModel && (
                <Model>
                    <ModelContent className={cx('model__friendOption')} bottomToTop onClose={handleCloseModelOption}>
                        <div className={cx('model__friendOption__user')}>
                            <div className={cx('model__friendOption__avatar')}>
                                <img src={data.avatar} alt="avatar"/>
                            </div>
                            <p>{data.username}</p>
                        </div>
                        <Button className={cx('model__friendOption__btn')} iconLeft={faFacebookMessenger}>Nhắn tin cho {username}</Button>
                        <Button className={cx('model__friendOption__btn')} iconLeft={faRectangleXmark}>Bỏ theo dõi {username}</Button>
                        <Button className={cx('model__friendOption__btn')} iconLeft={faUserXmark} onClick={handleDeleteFriend}>Hủy kết bạn với {username}</Button>
                    </ModelContent>
                </Model>
            )}
        </>
    );
}

export default FriendOptions;