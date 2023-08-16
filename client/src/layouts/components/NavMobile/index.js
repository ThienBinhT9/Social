import classNames from "classnames/bind";
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHome, faFilm, faUserFriends } from '@fortawesome/free-solid-svg-icons'

import styles from './NavMobile.module.scss'
import { activeNav } from '../../../redux/authSlice'

const cx = classNames.bind(styles)


function NavMobile() {
    const user = useSelector(state => state.auth.login?.currentUser)
    const active  = useSelector(state => state.auth.active.activeNav)

    const dispatch = useDispatch()


    return ( 
        <div className={cx('inner__mobile')}>
            <div className={cx('inner__mobile__content')}>
                <Link to='/' className={cx('inner__mobile__item',{active:active === ' '})} onClick={() => dispatch(activeNav(' '))}>
                    <FontAwesomeIcon icon={faHome} />
                </Link>
                <Link to='/interact' className={cx('inner__mobile__item',{active:active === 'interact'})} onClick={() => dispatch(activeNav('interact'))}>
                    <FontAwesomeIcon icon={faUserFriends} />
                </Link>
                <Link to='/video' className={cx('inner__mobile__item',{active: active === 'video'})} onClick={() => dispatch(activeNav('video'))}>
                    <FontAwesomeIcon icon={faFilm} />
                </Link>
                <Link to='/search' className={cx('inner__mobile__item',{active: active === 'search'})} onClick={() => dispatch(activeNav('search'))}>
                    <FontAwesomeIcon icon={faSearch} />
                </Link>
                <Link to={`/profile/${user?._id}`} className={cx('inner__mobile__item', 'inner__mobile__item--user',{active: active === 'profile'})} onClick={() => dispatch(activeNav('profile'))}>
                    <div className={cx('inner__mobile__item--user__avatar')}>
                        <img src={user?.avatar} alt='avatar'/>
                    </div>
                </Link>
            </div>
        </div>
     );
}

export default NavMobile;