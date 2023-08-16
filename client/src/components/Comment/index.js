import classNames from "classnames/bind";

import styles from './Comment.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import formatTimeAgo from "../../utils/timeAgo";

const cx = classNames.bind(styles)


function Comment({data}) {



    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <img src={data.avaUrl} alt="avatar"/>
            </div>
            <div className={cx('container')}>
                <div className={cx('info-user')}>
                    <span>{data.username}</span>
                    <span className={cx('createdAt')}>{formatTimeAgo(data.createdAt)}</span>
                </div>
                <p className={cx('content')}>{data.content}</p>
            </div>
            <FontAwesomeIcon className={cx('like')} icon={faHeart} />
        </div>
     );
}

export default Comment;