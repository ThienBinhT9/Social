import classNames from "classnames/bind";

import styles from './Model.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faClose } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

function Model({children}) {
    return ( 
        <div className={cx('model')}>
            {children}
        </div>
     );
}


export const ModelContent = ({children, className, rightToLeft, bottomToTop, title, onClose}) => {

    return (
        <div className={cx('container', {animation_rightToLeft:rightToLeft}, {animation_bottomToTop:bottomToTop}, {[className]:className})}>
            <header className={cx('header')}>
                <FontAwesomeIcon className={cx('close__mobile')} icon={faChevronLeft} onClick={onClose} />
                <h4 className={cx('title')}>{title}</h4>
                <FontAwesomeIcon className={cx('close__pc')} icon={faClose} onClick={onClose}/>
            </header>
            <div className={cx('content')}>
                {children}
            </div>
        </div>
    )
}


export default Model;