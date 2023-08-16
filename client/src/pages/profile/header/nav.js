import { memo } from "react";
import classNames from "classnames/bind";
import {useSelector, useDispatch} from 'react-redux'

import styles from '../profile.module.scss'
import Button from "../../../components/Button";
import { activeNavProfile } from "../../../redux/authSlice";
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles)


function NavProfile() {

    const user = useSelector(state => state.auth.login.currentUser)
    const active = useSelector(state => state.auth.active.activeNavProfile)
    const person = useSelector(state => state.user.getUser?.user)

    const {userId} = useParams()

    const dispatch = useDispatch()

    return ( 
        <div className={cx('nav')}>
            <Button to={`/profile/${person?._id}`} className={cx('nav__item',{active: active === ' '})} onClick={() => dispatch(activeNavProfile(' '))} >Bài viết</Button>
            <Button to={`/profile/${person?._id}/reels`} className={cx('nav__item',{active: active === 'reels'})} onClick={() => dispatch(activeNavProfile('reels'))}>Reels</Button>
            {user?._id === userId && <Button to={`/profile/${person?._id}/postsaved`} className={cx('nav__item',{active: active === 'postsave'})} onClick={() => dispatch(activeNavProfile('postsave'))}>Đã lưu</Button>}
            <Button to={`/profile/${person?._id}/taged`} className={cx('nav__item',{active: active === 'taged'})} onClick={() => dispatch(activeNavProfile('taged'))}>Gắn thẻ</Button>
        </div>
     );
}

export default memo(NavProfile);