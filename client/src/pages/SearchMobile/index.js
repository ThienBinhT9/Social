import classNames from "classnames/bind";

import styles from './SearchMobile.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import ButtonUser from "../../components/ButtonUser";
import { useEffect, useState } from "react";
import useDebouce from "../../hooks/useDebouce";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "../../utils/axiosInstance";
import { loginSuccess } from "../../redux/authSlice";
import LoadingSpinner from "../../components/Loading/loadingSpinner";

const cx = classNames.bind(styles)


function Search() {

    const user = useSelector(state => state.auth.login?.currentUser)

    const [results, setResult] = useState([])
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)

    const debouce = useDebouce(value, 1000)
    const dispatch = useDispatch()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)


    useEffect(() => {
        if(!debouce.trim()){
            setResult([])
        }
        else{
            const getResult = async() => {
                setLoading(true)
                const res = await axiosJWT.get(`/users?username=${debouce}`, {
                    headers:{
                        token: `Bearer ${user?.accessToken}`
                    }
                })
                setResult(res.data)
                setLoading(false)
            }

            getResult()
        }

    },[debouce])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search')}>
                <label htmlFor="search"><FontAwesomeIcon icon={faSearch} /></label>
                <input id="search" placeholder="Tìm kiếm" value={value} onChange={(e) => setValue(e.target.value)}/>
                {value && <FontAwesomeIcon icon={faClose} onClick={() => setValue('')}/>}
            </div>
            <div className={cx("search-result")}>
                {results.length !== 0 &&  <h4 className={cx('search-result__title')}>Kết quả</h4>}
                <div className={cx('search-result__content')}>
                {loading && <LoadingSpinner />}
                {!loading && results.map((user,index) => {
                    return <ButtonUser key={index} user={user}/>
                })}
                
            </div>
            </div>
        </div>
    );
}

export default Search;