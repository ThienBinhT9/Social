import classNames from "classnames/bind";
import {Link} from 'react-router-dom'

import styles from './ButtonUser.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { activeNav} from '../../redux/authSlice'

const cx = classNames.bind(styles)

function ButtonUser({user}) {

    const currentUser = useSelector(state => state.auth.login?.currentUser)
    const dispatch = useDispatch()

    return ( 
        <Link to={`/profile/${user?._id}`} className={cx('wrapper')} onClick={() => dispatch(activeNav('profile'))}>
            <div className={cx('avatar')}>
                <img src={user?.avatar} alt="avatar"/>
            </div>
            <div className={cx('info')}>
                <p>{user?.username}</p>
                {currentUser.friends.includes(user?._id) && <span>Bạn bè</span>}
            </div>
        </Link>
     );
}

export default ButtonUser;