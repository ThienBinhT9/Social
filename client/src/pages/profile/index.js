import classNames from "classnames/bind";
import { memo, useEffect } from 'react'

import styles from './profile.module.scss'
import HeaderProfile from "./header";
import BodyProfile from "./body";

const cx = classNames.bind(styles)


function Profile() {

    return (
        <div className={cx('wrapper')}>
            <HeaderProfile />
            <BodyProfile />
        </div>
    );
}

export default memo(Profile);