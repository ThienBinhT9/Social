import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'

import styles from './home.module.scss'
import { loginSuccess } from '../../redux/authSlice'
import createAxios from '../../utils/axiosInstance'
import Post from '../../components/Post'
import LoadingPost from '../../components/Loading/loadingPost'

const cx = classNames.bind(styles)


function Home() {

    const user = useSelector(state => state.auth.login.currentUser)

    const [page, setPage] = useState(1)
    const [posts, setPosts] = useState([])
    const [hasMore, setHasMore] = useState(false)

    const dispatch = useDispatch()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)

    const handleLoadMore = () => {
        try {
            setTimeout(async() => {
                const res = await axiosJWT(`/posts?page=${page}`, {
                    headers:{
                        token:`Bearer ${user?.accessToken}`
                    }
                })
                setPosts(prev => [...prev, ...res.data])
                setPage(prev => prev + 1)
                setHasMore(res.data.length < 4 ? false : true)
            },400)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleLoadMore()
        setHasMore(true)
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    },[])

    return (
        <div className={cx('wrapper')}>
            <InfiniteScroll
                dataLength={posts.length}
                next={handleLoadMore}
                hasMore={hasMore}
                loader={<LoadingPost />}
            >
                <div className={cx('content')}>
                    {posts && posts.map((post,index) => {
                        return <Post key={index} data={post}/>
                    })}
                </div>
            </InfiniteScroll>
        </div>
    );
}

export default Home;