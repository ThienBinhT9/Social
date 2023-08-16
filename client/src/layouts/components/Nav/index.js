import classNames from "classnames/bind";
import {useDispatch, useSelector} from 'react-redux'
import { faHome, faFilm, faBars } from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus, faUser } from '@fortawesome/free-regular-svg-icons'

import styles from './Nav.module.scss'
import { activeNav } from '../../../redux/authSlice'
import Button from "../../../components/Button";

const cx = classNames.bind(styles)


function Nav() {
    const user = useSelector(state => state.auth.login?.currentUser)
    const active  = useSelector(state => state.auth.active.activeNav)

    const dispatch = useDispatch()

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('section')}>
                    <Button 
                        to='/' 
                        className={cx('section__item',{active: active === ' '})} 
                        iconLeft={faHome} 
                        onClick={() => dispatch(activeNav(' '))}
                    >
                        Trang chủ
                    </Button>
                    <Button 
                        to={`/profile/${user?._id}`} 
                        className={cx('section__item',{active: active === 'profile'})} 
                        iconLeft={faUser} 
                        onClick={() => dispatch(activeNav('profile'))} 
                    >
                        Trang cá nhân
                    </Button>
                </div>
                <div className={cx('section')}>
                    <Button to='/video' className={cx('section__item',{active: active === 'video'})} iconLeft={faFilm}  onClick={() => dispatch(activeNav('video'))}>Video</Button>
                    <Button to='/create-post' className={cx('section__item',{active: active === 'create-post'})} iconLeft={faSquarePlus}  onClick={() => dispatch(activeNav('create-post'))}>Tạo bài viết</Button>
                </div>
                <div className={cx('section')}>
                    <Button className={cx('section__item')} iconLeft={faBars}>Xem thêm</Button>
                </div>
            </div>
        </div>   
    );
}

export default Nav;