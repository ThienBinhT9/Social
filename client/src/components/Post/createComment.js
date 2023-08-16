import classNames from "classnames/bind";

import styles from './Post.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { memo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPaperPlane} from '@fortawesome/free-regular-svg-icons'
import { createComment } from '../../redux/apiRequests'
import createAxios from "../../utils/axiosInstance";
import { loginSuccess } from "../../redux/authSlice";

const cx = classNames.bind(styles)

function AddComment({data}) {

    const user = useSelector(state => state.auth.login.currentUser)
    
    const [value, setValue] = useState('')

    const dispatch = useDispatch()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)

    const handleCreateComment = () => {

        const dataPost = {
            userId:user?._id,
            content:value
        }

        createComment(data._id, dataPost, user?.accessToken, dispatch, axiosJWT)
        setValue('')
    }

    return ( 
        <div className={cx('form-comment')}>
            <div className={cx('form-comment__avatar')}>
                <img src={user?.avatar} alt="avatar"/>
            </div>
            <input type="text" placeholder="Bình luận" value={value} onChange={(e) => setValue(e.target.value)}/>
            <FontAwesomeIcon icon={faPaperPlane} onClick={handleCreateComment}/>
        </div>
     );
}

export default memo(AddComment);