import { memo } from "react";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";

import styles from '../profile.module.scss'
import Posts from './posts'
import Reels from "./reels";
import Postsaved from "./postsaved";
import Taged from "./taged";

const cx = classNames.bind(styles)


function BodyProfile() {

    const { nav } = useParams()

    return ( 
        <div className={cx('body')}>
            {!nav && <Posts />}
            {nav === 'reels' && <Reels />}
            {nav === 'postsaved' && <Postsaved />}
            {nav === 'taged' && <Taged />}
        </div>
    );
}

export default memo(BodyProfile);