import classNames from "classnames/bind";
import { memo, useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart, faComment, faPaperPlane} from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSoilid, faBookmark as faBookmarkSoilid } from '@fortawesome/free-solid-svg-icons'

import styles from './Post.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { likePost, savePost } from '../../redux/apiRequests'
import createAxios from "../../utils/axiosInstance";
import { loginSuccess } from "../../redux/authSlice";

import Comment from "./comment";

const cx = classNames.bind(styles)

function Actions({data}) {

    const user = useSelector(state => state.auth.login.currentUser)

    const [like, setLike] = useState(data.likes.includes(user?._id))
    const [saved, setSaved] = useState(data.saved.includes(user?._id))
    const [quantityLike, setQuantityLike] = useState(data?.likes.length)
    const [showDesc, setShowDesc] = useState(true)

    const dispatch = useDispatch()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)

    const handleLike = () => {
        setLike(prev => prev === false ? true : false)
        if(!like){
            setQuantityLike(prev => prev + 1)
        }else{
            setQuantityLike(prev => prev - 1)
        }
        const dataUser = {
            userId:user?._id
        }
        likePost(dataUser, data._id, user?.accessToken, dispatch, axiosJWT)
    }

    const handleSave = () => {
        const dataUser = {
            userId:user?._id
        }
        setSaved(prev => prev === false ? true : false)
        savePost(dataUser, data._id, user?.accessToken, dispatch, axiosJWT)
    }

    return ( 
        <>
            <div className={cx('footer')}>
                <div className={cx('actions')}>
                    <div className={cx('actions__left')}>
                        {like === false && <FontAwesomeIcon icon={faHeart} className={cx('actions__left__item')} onClick={handleLike}/>}
                        {like === true && <FontAwesomeIcon icon={faHeartSoilid} className={cx('actions__left__item','actions__left__item--liked')} onClick={handleLike}/>}
                        <FontAwesomeIcon icon={faComment} className={cx('actions__left__item')}/>
                        <FontAwesomeIcon icon={faPaperPlane} className={cx('actions__left__item')}/>
                    </div>
                    <div className={cx('actions__right')}>
                        {saved === false && <FontAwesomeIcon icon={faBookmark} className={cx('actions__left__item')} onClick={handleSave}/>}
                        {saved === true && <FontAwesomeIcon icon={faBookmarkSoilid} className={cx('actions__left__item','actions__left__item--saved')} onClick={handleSave}/>}
                    </div>
                </div>
                <div className={cx('parameter')}>
                    <span>{quantityLike} Lượt thích</span>
                </div>
                {data.title && (
                    <div className={cx('post__desc')}>
                        <div className={cx({post__desc__content:showDesc})}>
                            {data.title && <span className={cx('post__username')}>{data.username}</span>}
                            {data.title && <span>{data.title}</span>}
                        </div>
                        {data.title && showDesc && <span className={cx('post__desc__btn-loadmore')} onClick={() => setShowDesc(false)}>...Xem thêm</span>}
                    </div>
                )}
                <Comment data={data}/>
            </div>
        </>
    );
}

export default memo(Actions);