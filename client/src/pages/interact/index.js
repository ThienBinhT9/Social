import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './interact.module.scss'
import Button from "../../components/Button";
import { Link, useParams } from "react-router-dom";
import LoadingUser from "../../components/Loading/loadingUser";
import { useEffect, useState } from "react";
import createAxios from "../../utils/axiosInstance";
import { loginSuccess } from "../../redux/authSlice";
import { activeNav } from '../../redux/authSlice'
import Friends from "./friends";
import { acceptFriends } from '../../redux/apiRequests'
import { acceptUserSuccess } from '../../redux/userSlice'

const cx = classNames.bind(styles)


function Interact() {

    const user = useSelector(state => state.auth.login?.currentUser)
    const personWantAccept = useSelector(state => state.user.acceptFriend?.user)

    const [page, setPage] = useState(1)
    const [items, setItems] = useState([])
    const [hasMore, setHasMore] = useState(false)

    const dispatch = useDispatch()
    const { friends } = useParams()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)

    const handleAccept = (id) => {
        const data = {
            userId:id
        }
        acceptFriends(user?._id, data, dispatch, user?.accessToken, axiosJWT)
    }

    const handleLoadMore = () => {
        setTimeout(async() => {
            const res = await axiosJWT.get(`/users/${user?._id}/follower?page=${page}`, {
                headers:{
                    token: `Bearer ${user?.accessToken}`
                }
            })
            setItems(prev => [...prev, ...res.data])
            setPage(prev => prev + 1)
            setHasMore(res.data.length === 0 ? false : true)
        },300)
    }

    useEffect(() => {
        handleLoadMore()
        setHasMore(true)
    },[])

    useEffect(() => {
        if(personWantAccept){
            const index = items.findIndex(element => element._id === personWantAccept.friends[personWantAccept.friends.length - 1])
            items.splice(index, 1)
            setItems(items)
            dispatch(acceptUserSuccess(null))
        }
    },[personWantAccept])

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header__search')}>
                    <h2>Bạn bè</h2>
                    <FontAwesomeIcon icon={faSearch} />
                </div>
                <div className={cx('header__under')}>
                    <Link to='/interact' className={cx('header__under__item')}>Lời mời</Link>
                    <Link to='/interact/friends' className={cx('header__under__item')}>Bạn bè</Link>
                </div>
            </div>
            <div className={cx('body')}>
                {friends === undefined && (
                    <section className={cx('body__section')}>
                        <div className={cx('section__header')}>
                            <h4>Lời mời kết bạn</h4>
                            <Link>Xem tất cả</Link>
                        </div>
                        <div className={cx('section__body')}>
                            <InfiniteScroll
                                dataLength={items.length}
                                next={handleLoadMore}
                                hasMore={hasMore}
                                loader={<LoadingUser />}
                            >
                                {
                                    items && items.map((item, index) => {
                                        return (
                                            <div className={cx('user')} key={index}>
                                                <Link to={`/profile/${item._id}`} className={cx('user__avatar')} onClick={() => dispatch(activeNav('profile'))}>
                                                    <img src={item.avatar} alt="avatar"/>
                                                </Link>
                                                <div className={cx('user__info')}>
                                                    <div className={cx('user__info__top')}>
                                                        <p className={cx('user__info__name')}>{item.username}</p>
                                                    </div>
                                                    <div className={cx('user__info__bottom')}>
                                                        <Button primary className={cx('user__info__btn')} onClick={() => handleAccept(item._id)}>Chấp nhận</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </InfiniteScroll>
                        </div>
                    </section>)}

                {friends === 'friends' && <Friends />}
            </div>
        </div>
    );
}

export default Interact;