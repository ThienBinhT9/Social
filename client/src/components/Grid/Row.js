import classNames from "classnames/bind";

import styles from './Grid.module.scss'

const cx = classNames.bind(styles)

function Row({children}) {
    return ( 
        <div className={cx('row')}>
            {children}
        </div>
     );
}

export default Row;