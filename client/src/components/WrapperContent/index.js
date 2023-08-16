import classNames from "classnames/bind";

import styles from './WrapperContent.module.scss'

const cx = classNames.bind(styles)

function WrapperContent({children, className}) {
    return ( 
        <div className={cx('wrapper',{[className]:className})}>
            {children}
        </div>
     );
}

export default WrapperContent;