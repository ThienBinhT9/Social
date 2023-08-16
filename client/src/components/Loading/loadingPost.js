import classNames from "classnames/bind";

import styles from './LoadingSpinner.module.scss'

const cx = classNames.bind(styles);

function LoadingPost() {
    return ( 
        <div className={cx('loading__post')}>
            <div className={cx('loading__post__header')}>
                <div className={cx('loading__post__info')}>
                    <div to={`/`} className={cx('avatar')}>
                        <span></span>
                    </div>
                    <div className={cx('loading__post__info__name')}>
                        <p className={cx('name')}><span></span></p>
                        <span className={cx('createdAt')}><span></span></span>
                    </div>
                </div>

            </div>
            <div className={cx('body')}>
            </div>
        </div>
     );
}

export default LoadingPost;