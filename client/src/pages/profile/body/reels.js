import classNames from "classnames/bind";

import styles from '../profile.module.scss'

const cx = classNames.bind(styles)

function Reels() {
    return ( 
        <div className={cx('body__reelss')}>
            <h3>Reel pages</h3>
        </div> 
    );
}

export default Reels;