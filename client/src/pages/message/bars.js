import { useState } from "react";
import classNames from "classnames/bind";
import { faBars, faBoxArchive, faComment, faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCommentDots} from '@fortawesome/free-regular-svg-icons'

import styles from './message.module.scss' 
import Button from '../../components/Button'
import Model, {ModelContent} from '../../components/Model'

const cx = classNames.bind(styles)

function Bars() {

    const [showBar, setShowBar] = useState(false)

    const handleShowBar = () => {
        setShowBar(true)
    }

    const handleCloseBar = () => {
        setShowBar(false)
    }

    return ( 
        <> 
            <div className={cx('header__item')} onClick={handleShowBar}><FontAwesomeIcon icon={faBars}/></div>
            {showBar && (
                <Model>
                    <ModelContent onClose={handleCloseBar} rightToLeft className={cx('model__bar')} title='Thư mục'>
                        <div className={cx('nav')}>
                            <Button className={cx('model__bar__item', 'active')} iconLeft={faComment}>Đoạn chat</Button>
                            <Button className={cx('model__bar__item')} iconLeft={faShop}>Marketplace</Button>
                            <Button className={cx('model__bar__item')} iconLeft={faCommentDots}>Tin nhắn đang chờ</Button>
                            <Button className={cx('model__bar__item')} iconLeft={faBoxArchive}>Kho lưu trữ</Button>
                        </div>
                        <div>

                        </div>
                    </ModelContent>
                </Model>
            )}
        </>
    );
}

export default Bars;