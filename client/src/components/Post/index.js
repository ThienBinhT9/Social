import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from './Post.module.scss'
import Actions from './actions'
import timeAgo from '../../utils/timeAgo'
import Options from "./options";

const cx = classNames.bind(styles)

function Post({data}) {

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('info')}>
                    <Link to={`/profile/${data?._id}`} className={cx('avatar')}>
                        <img src={data?.avaUrl} alt="avatar"/>
                    </Link>
                    <div className={cx('info__name')}>
                        <p className={cx('name')}><Link to={`/profile/${data?._id}`}>{data?.username}</Link></p>
                        <span className={cx('createdAt')}>{timeAgo(data?.createdAt)}</span>
                    </div>
                </div>
                <Options data={data}/>
            </div>
            <div className={cx('body')}>
                {data?.image && (
                    <div className={cx('image')}>
                        <img src={data?.image} alt=""/>
                    </div>
                )}
            </div>
            <Actions data={data}/>
        </div>
     );
}

export default Post;