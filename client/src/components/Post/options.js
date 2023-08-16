import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import { memo, useState } from "react"; 
import { faEllipsis, faUserMinus, faEyeSlash, faTrash, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faPaperPlane, faStar, faCircleUser } from '@fortawesome/free-regular-svg-icons'

import styles from './Post.module.scss'
import Model, { ModelContent } from "../Model";
import Button from '../Button'
import createAxios from '../../utils/axiosInstance'
import { loginSuccess } from "../../redux/authSlice";
import { deletePost } from '../../redux/apiRequests'


const cx = classNames.bind(styles)

function Options({data}) {


    const user = useSelector(state => state.auth.login.currentUser)

    const [showModelOption, setShowModelOption] = useState(false)

    const dispatch = useDispatch()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)

    const handleShowModelOption = () => {
        setShowModelOption(true)
    }

    const handleCloseModelOption = () => {
        setShowModelOption(false)
    }

    const handleDeletePost = () => {
        deletePost(user?._id, data._id, user?.accessToken, dispatch, axiosJWT)
        setShowModelOption(false)
    }

    return ( 
        <>
            <div className={cx('options')} onClick={handleShowModelOption}>
                <FontAwesomeIcon icon={faEllipsis} />
            </div>

            {showModelOption && (
                <Model>
                    <ModelContent className={cx('model__option')} onClose={handleCloseModelOption} bottomToTop>
                        <div className={cx('model__option__section')}>
                            <Button className={cx('model__option__item')} iconLeft={faStar}>Thêm vào mục yêu thích</Button>
                        </div>
                        <div className={cx('model__option__section')}>
                            <Button className={cx('model__option__item')} iconLeft={faCircleUser}>Giới thiệu về tài khoản này</Button>
                            <Button className={cx('model__option__item')} iconLeft={faUserMinus}>Bỏ theo dõi</Button>
                        </div>
                        <div className={cx('model__option__section')}>
                            <Button className={cx('model__option__item')} iconLeft={faEyeSlash}>Ẩn</Button>
                            {user?._id === data.userId && <Button className={cx('model__option__item')} iconLeft={faTrash} onClick={handleDeletePost}>Xóa bài viết này</Button>}
                            <Button className={cx('model__option__item')} iconLeft={faPaperPlane}>Chia sẻ</Button>
                        </div>
                        <div className={cx('model__option__section')}>
                            <Button className={cx('model__option__item')} iconLeft={faInfo}>Lý do bạn nhìn thấy bài viết này</Button>
                            <Button className={cx('model__option__item')} iconLeft={faCircleQuestion}>Báo cáo</Button>
                        </div>
                    </ModelContent>
                </Model>
            )}
        </>
    );
}

export default memo(Options);