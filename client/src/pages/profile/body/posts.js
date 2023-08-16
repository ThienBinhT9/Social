import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from '../profile.module.scss'
import Post from '../../../components/Post'
import CreativePost from "./creativePost";
import createAxios from "../../../utils/axiosInstance";
import { loginSuccess } from "../../../redux/authSlice";
import InfiniteScroll  from 'react-infinite-scroll-component';
import LoadingPost from "../../../components/Loading/loadingPost";
import {createPostSuccess, deletePostSuccess} from '../../../redux/postSlice'

const cx = classNames.bind(styles)

function Posts() {

    const user = useSelector(state => state.auth.login.currentUser)
    const post = useSelector(state => state.post.createPost?.post)
    const deletePost = useSelector(state => state.post.deletePost?.post)

    const [items,setItems] = useState([])
    const pageRef = useRef(1)
    const [hasMore, setHasMore] = useState(false);

    const dispatch = useDispatch()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)
    const { userId } = useParams()

    useEffect(() => {
        if(post) {
            setItems(prev => [post, ...prev])
            dispatch(createPostSuccess(null))
        }
    },[post])

    useEffect(() => {
        if(deletePost) {
            const index = items.findIndex(item => item._id === deletePost._id)
            items.splice(index, 1)
            setItems(items)
            dispatch(deletePostSuccess(null))
        }
    },[deletePost])

    const MoreData = () => {
        try {
            setTimeout(async() => {
                const res = await axiosJWT.get(`/posts/${userId}?page=${pageRef.current}`, {
                    headers: {
                        token: `Bearer ${user?.accessToken}`
                    }
                })
                setItems(prev => [...prev, ...res.data])
                pageRef.current++
                setHasMore(res.data.length < 4 ? false : true)
            },400)
        } catch (error) {
            console.log('Không lấy được dữ liệu');
        }
    }

    useEffect(() => {
        pageRef.current = 1

        setTimeout(async () => {
            const res = await axiosJWT.get(`/posts/${userId}?page=${pageRef.current}`, {
                headers: {
                    token: `Bearer ${user?.accessToken}`
                }
            })
            setItems(res.data)
            pageRef.current++
        },400)

        setHasMore(true)

        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    },[userId])


    return ( 
        <div className={cx('body__posts')}>
            {user?._id === userId && <CreativePost />}
            <InfiniteScroll
                dataLength={items.length}
                next={MoreData}
                hasMore={hasMore}
                loader={<LoadingPost />}
            >
                {items && items.map((post, index) => {
                    return <Post key={index} data={post}/>
                })}
            </InfiniteScroll>
        </div>
    );
}

export default Posts;