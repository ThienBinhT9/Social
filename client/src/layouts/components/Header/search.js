import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Tippy from '@tippyjs/react/headless'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";

import styles from './Header.module.scss'
import WrapperContent from "../../../components/WrapperContent";
import ButtonUser from '../../../components/ButtonUser'
import { searchUser } from '../../../redux/apiRequests'
import useDebouce from "../../../hooks/useDebouce";
import createAxios from '../../../utils/axiosInstance'
import { loginSuccess } from "../../../redux/authSlice";
import Loading from '../../../components/Loading/loadingSpinner'

const cx = classNames.bind(styles)

function Search() {

    const user = useSelector(state => state.auth.login?.currentUser)

    const [value, setValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setloading] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const debouce = useDebouce(value, 1500)
    const dispatch = useDispatch()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)

    useEffect(() => {
        if(!debouce.trim()){
            setSearchResult([])
        }
        else{
            const getData = async() => {
                setloading(true)
                const results =  await axiosJWT.get(`/users?username=${debouce}`, {
                    headers:{
                        token: `Bearer ${user?.accessToken}`
                    }
                })
                setSearchResult(results.data)
                setloading(false)
            }
            getData()
        }
    }, [debouce])

    return ( 
            <div className={cx('search')}>
                <FontAwesomeIcon icon={faSearch} className={cx('icon-search')} />
                <Tippy
                    visible={showResult && searchResult.length > 0}
                    render={attrs => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <WrapperContent>
                                <div className={cx('search-result__container')}>
                                    <h4 className={cx('search-result__title')}>Kết quả tìm kiếm</h4>
                                    <div className={cx('search-result__content')}>
                                        {loading && <Loading />}
                                        {!loading && searchResult && searchResult.map((user, index) => {
                                            return <ButtonUser user={user} key={index}/>
                                        })}
                                        <div className={cx('search-result__loadmore')}>Xem thêm</div>
                                    </div>
                                </div>
                            </WrapperContent>
                        </div>
                    )}
                    interactive={true}
                    placement="bottom"
                    offset={[0, 13]}
                    onClickOutside={() => setShowResult(false)}
                >

                    <input type="text" placeholder="Tìm kiếm" value={value} className={cx('search-input')} onChange={(e) => setValue(e.target.value)} onFocus={() => setShowResult(true)}/>
                </Tippy>
            </div>
     );
}

export default Search;