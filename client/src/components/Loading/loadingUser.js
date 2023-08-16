import classNames from "classnames/bind";

import styles from './LoadingSpinner.module.scss'

const cx = classNames.bind(styles)


function LoadingUser() {
    return ( 
        <div className={cx('loading__user')}>
            <div className={cx('loading__user__avatar')}><span></span></div>
            <div className={cx('loading__user__info')}>
                <p className={cx('loading__user__info__name')}><span></span></p>
                <p className={cx('loading__user__info__created')}><span></span></p>
            </div>
        </div>
     );
}

export default LoadingUser;