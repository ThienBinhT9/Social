import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import styles from './Post.module.scss'
import Model, { ModelContent } from "../Model";
import formatTimeAgo from "../../utils/timeAgo";
import AddComment from './createComment'
import CommentPost from '../Comment'
import createAxios from "../../utils/axiosInstance";
import { loginSuccess } from "../../redux/authSlice";
import {createCommentSuccess} from '../../redux/commentSlice'

const cx = classNames.bind(styles);

function ModelComment({setShowModelComment, data}) {

    const user = useSelector(state => state.auth.login.currentUser)
    const addComment = useSelector(state => state.comment.createComment.comment)

    const [page, setPage] = useState(1)
    const [comments, setComments] = useState([])
    const [hasMore, setHasMore] = useState(false)

    const dispatch = useDispatch()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)


    const handleCloseModelComment = () => {
        setShowModelComment(false)
    }
        
    const handleLoadMoreData = async() => {
        try {
                const res = await axiosJWT.get(`/comments/${data._id}?page=${page}`, {
                    headers:{
                        token: `Bearer ${user?.accessToken}`
                    }
                })
                setComments(prev => [...prev, ...res.data])
                setPage(prev => prev + 1)
                setHasMore(res.data.length > 0 ? true : false)
        } catch (error) {
            console.log('Lấy dữ liệu không thành công');
        }
    }

    useEffect(() => {
        handleLoadMoreData()
    },[])

    useEffect(() => {
        if(addComment) {
            setComments(prev => [addComment, ...prev])
            dispatch(createCommentSuccess(null))
        }
    },[addComment])


    return ( 
        <Model>
            <ModelContent title='Bình luận' onClose={handleCloseModelComment} rightToLeft className={cx('model__comment')}>
                <div className={cx('comment__content')}>
                    <div className={cx('comment__avatar__author')}>
                        <img src={data.avaUrl} alt="avatar"/>
                    </div>
                    <div className={cx('comment__title')}>
                        <div className={cx('comment__title__info__author')}>
                            <span>{data.username}</span>
                            <span className={cx('comment__title__info__author__createdAt')}>{formatTimeAgo(data.createdAt)}</span>
                        </div>
                        <p>{data.title}</p>
                    </div>
                </div>
                <div className={cx('comments__user')}>
                    {   
                        comments.map((comment, index) => {
                            return <CommentPost key={index} data={comment}/>
                        })
                    }
                    {(hasMore && comments.length > 10) && <span className={cx('comments__user__btn__loadmore')}>Xem thêm</span>}
                </div>
                <AddComment data={data}/>
            </ModelContent>
        </Model>
    );
}

export default ModelComment;