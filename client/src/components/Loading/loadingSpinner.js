import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import styles from './LoadingSpinner.module.scss'

const cx = classNames.bind(styles)

function LoadingSpinner() {
    return ( 
        <div className={cx('loading')}>
            <div className={cx('icon-loading')}><FontAwesomeIcon icon={faSpinner}/></div>
        </div>
     );
}

export default LoadingSpinner;