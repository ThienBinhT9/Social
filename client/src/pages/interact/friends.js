import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component'

import styles from './interact.module.scss'
import FriendOptions from "./friendOptions";
import createAxios from "../../utils/axiosInstance";
import { loginSuccess } from "../../redux/authSlice";
import LoadingUser from "../../components/Loading/loadingUser";
import { ignoreSuccess } from '../../redux/userSlice'

const cx = classNames.bind(styles)

function Friends() {

    const user = useSelector(state => state.auth.login?.currentUser)
    const userAfterDelete = useSelector(state => state.user.ignoreFriend?.user)

    const [page, setPage] = useState(1)
    const [items, setItems] = useState([])
    const [hasMore, setHasMore] = useState(false)

    const dispatch = useDispatch()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)

    const handleLoadMore = () => {
        setTimeout(async() => {
            const res = await axiosJWT.get(`/users/${user?._id}/friends?page=${page}`, {
                headers:{
                    token: `Bearer ${user?.accessToken}`
                }
            })
            setItems(prev => [...prev, ...res.data])
            setPage(prev => prev + 1)
            setHasMore(res.data.length === 0 ? false : true)
        },200)
    }

    useEffect(() => {
        handleLoadMore()
        setHasMore(true)
    },[])

    // useEffect(() => {
    //     if(userAfterDelete){
    //         const index = items.findIndex(e => e)
    //         dispatch(ignoreSuccess(null))
    //     }
    // },[userAfterDelete])

    return ( 
        <div className={cx('friends')}>
            <InfiniteScroll
                dataLength={items}
                next={handleLoadMore}
                hasMore={hasMore}
                loader={<LoadingUser />}
            >
                {
                    items && items.map((item, index) => {
                        return (
                            <div className={cx('friends__user')} key={index}>
                                <Link to={`/profile/${item._id}`} className={cx('friend__user__avatar')}>
                                    <img src={item.avatar}/>
                                </Link>
                                <Link to={`/profile/${item._id}`} className={cx('friend__user__username')}>{item.username}</Link>
                                <FriendOptions data={item} setItems={setItems}/>
                            </div>
                        )
                    })
                }
            </InfiniteScroll>
        </div>
     );
}

export default memo(Friends);