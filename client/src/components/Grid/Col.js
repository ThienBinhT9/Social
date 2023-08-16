import classNames from "classnames/bind";

import styles from './Grid.module.scss'

const cx = classNames.bind(styles)

function Col({children, l, m, s, mb}) {
    return ( 
        <div className={cx('col',{[`l-${l}`]:l}, {[`m-${m}`]:m},{[`s-${s}`]:s})} style={{marginBottom:mb}}>
            {children}
        </div>
     );
}

export default Col;