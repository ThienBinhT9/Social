import classNames from "classnames/bind";

import styles from '../profile.module.scss'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "../../../utils/axiosInstance";
import { loginSuccess } from "../../../redux/authSlice";
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams } from "react-router-dom";
import LoadingPost from "../../../components/Loading/loadingPost";
import Post from "../../../components/Post";
import { createPostSuccess, deletePostSuccess } from '../../../redux/postSlice'

const cx = classNames.bind(styles)

function Postsaved() {

    const user = useSelector(state => state.auth.login.currentUser)
    const post = useSelector(state => state.post.createPost?.post)
    const deletePost = useSelector(state => state.post.deletePost?.post)

    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([])
    const [hasMore, setHasMore] = useState(false)

    const dispatch = useDispatch()
    const { userId } = useParams()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)
    

    const handleLoadMore = () => {
        try {
            setTimeout(async() => {
                const res = await axiosJWT.get(`/posts/saved/${userId}?page=${page}`, {
                    headers:{
                        token: `Bearer ${user?.accessToken}`
                    }
                })
                setPage(prev => prev + 1)
                setPosts(prev => [...prev, ...res.data])
                setHasMore(res.data.length < 4 ? false : true)
            },400)
        } catch (error) {
            console.log('Không lấy được dữ liệu');
        }
    }

    useEffect(() => {
        if(post) {
            setPosts(prev => [post, ...prev])
            dispatch(createPostSuccess(null))
        }
    },[post])

    useEffect(() => {
        if(deletePost) {
            const index = posts.indexOf(deletePost)
            setPosts(prev => prev.splice(index, 1))
            dispatch(deletePostSuccess(null))
        }
    },[deletePost])

    useEffect(() => {
        handleLoadMore()
        setHasMore(true)
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    },[])

    return ( 
        <div className={cx('body__postsaveds')}>
            <InfiniteScroll
                dataLength={posts.length}
                next={handleLoadMore}
                hasMore={hasMore}
                loader={<LoadingPost />}
            >
                {posts.map((post, index) => {
                    return <Post key={index} data={post}/>
                })} 
            </InfiniteScroll>
        </div> 
    );
}

export default Postsaved;