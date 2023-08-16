import classNames from "classnames/bind";

import styles from './video.module.scss'

const cx = classNames.bind(styles)


function Video() {
    return ( 
        <div className={cx('wrapper')}>
            <h1>VIDEO PAGE</h1>
        </div>
     );
}

export default Video;