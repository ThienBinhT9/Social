import classNames from "classnames/bind";
import { Link } from 'react-router-dom'

import styles from './message.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import Bars from "./bars";

const cx = classNames.bind(styles)

function Message() {
    return ( 
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <Link to='/' className={cx('header__item')}><FontAwesomeIcon icon={faArrowLeft} /></Link>
                <Bars />
                <span className={cx('header__item__text')}>Tin nhắn</span>
            </header>
            <div className={cx('search')}>
                <label><FontAwesomeIcon icon={faSearch} /></label>
                <input placeholder="Tìm kiếm"/>
            </div>
            <div className={cx('body')}>
                
            </div>
        </div>
     );
}

export default Message;