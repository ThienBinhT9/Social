import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faChevronDown, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import classNames from 'classnames/bind'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Tippy from '@tippyjs/react/headless'

import styles from './Header.module.scss'
import logo from '../../../assets/images/logo.png'
import logoDarkMode from '../../../assets/images/logoDarkMode.png'
import { loginSuccess, setMode } from '../../../redux/authSlice'
import Search from './search'
import WrapperContent from '../../../components/WrapperContent'
import Button from '../../../components/Button'
import { logout } from '../../../redux/apiRequests'
import createAxios from '../../../utils/axiosInstance'
import { activeNav } from '../../../redux/authSlice'

const cx = classNames.bind(styles)

function Header() {

    const user = useSelector(state => state.auth.login?.currentUser)
    const mode = useSelector(state => state.auth.mode)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)

    const handleLogout = () => {
        logout(user?.id, user?.accessToken, dispatch, navigate, axiosJWT)
    }

    return ( 
        <header className={cx('wrapper',{wrapper__darkmode:mode === 'dark'})}>
            <div className={cx('inner')}>

                <Link className={cx('logo')} to='/' onClick={() => dispatch(activeNav(' '))}>
                    <img src={mode === 'light' ? logo : logoDarkMode} alt="logo"/>
                </Link>

                <Search />
            
                <div className={cx('actions')}>
                    <div className={cx('actions__item')}>
                        <FontAwesomeIcon icon={faBell} className={cx('actions__item__icon')} />
                        <div className={cx('action__item__notifi')}></div>
                    </div>    
                    <Link to='/messages' className={cx('actions__item')}>
                        <FontAwesomeIcon icon={faFacebookMessenger} className={cx('actions__item__icon')} />
                        <div className={cx('action__item__notifi')}></div>
                    </Link>
                    <Tippy
                        render={attrs => (
                            <div className={cx('actions__options-user')} tabIndex="-1" {...attrs}>
                                <WrapperContent>
                                    <div className={cx('menu__user__pc')}>
                                        <Link to={`/profile/${user?._id}`} className={cx('menu__user__pc__header')}>
                                            <div className={cx('menu__user__pc__avatar')}>
                                                <img src={user?.avatar} alt='avatar'/>
                                            </div>
                                            <span>{user?.username}</span>
                                        </Link>
                                        <div className={cx('menu__user__pc__body')}>
                                            {mode === 'dark' && <Button className={cx('menu__user__pc__btn')} iconLeft={faMoon} onClick={() => dispatch(setMode('light'))}>Light mode</Button>}
                                            {mode === 'light' && <Button className={cx('menu__user__pc__btn')} iconLeft={faSun} onClick={() => dispatch(setMode('dark'))}>Dark mode</Button>}
                                            <Button className={cx('menu__user__pc__btn')} iconLeft={faRightFromBracket} onClick={handleLogout}>Đăng xuất</Button>
                                        </div>
                                    </div>
                                </WrapperContent>
                            </div>
                        )}
                        trigger='click' 
                        interactive={true}
                        placement='bottom-end'
                        offset={[20, 12]}

                    >
                        <div className={cx('actions__item','actions__item--nav-user')}>
                            <img src={user?.avatar} alt="avatar-user"/>
                            <div className={cx('actions__item__icon-chervonDown')}>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                        </div>
                    </Tippy>
                </div>
    
            </div>
        </header>
    );
}

export default Header;