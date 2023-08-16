import classNames from "classnames/bind";

import styles from '../profile.module.scss'

const cx = classNames.bind(styles)

function Taged() {
    return ( 
        <div className={cx('body__tageds')}>
            <h3>taged pages</h3>
        </div> 
    );
}

export default Taged;