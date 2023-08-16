import { memo, useState } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";

import styles from '../profile.module.scss'
import Model, {ModelContent} from '../../../components/Model'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { createPost } from '../../../redux/apiRequests'
import createAxios from "../../../utils/axiosInstance";
import { loginSuccess } from "../../../redux/authSlice";
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles)

function CreativePost() {

    const person = useSelector(state => state.user.getUser.user)
    const user = useSelector(state => state.auth.login.currentUser)

    const [showModelCreatePost, setShowModelCreatePost] = useState(false)
    const [picture, setPicture] = useState(' ')
    const [pictureFormData, setPictureFormData] = useState(null)
    const [value, setValue] = useState('')

    const dispatch = useDispatch()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)
    const { userId } = useParams()


    const handleShowModel = () => {
        setShowModelCreatePost(true)
    }

    const handleCloseModel = () => {
        setShowModelCreatePost(false)
    }



    const handleChangePicturePost = (e) => {
        const file = e.target.files[0];
        setPictureFormData(file)
        const _picture = e.target.files[0]
        
        const render = new FileReader();
        render.onload = (e) => {
            const imageData = e.target.result
            setPicture(imageData)
        }
        
        render.readAsDataURL(_picture)
    }

    const handleSubmit = () => {
        if(!value && !picture){
            return;
        }else{
            const uploadData = new FormData();
            uploadData.append('title', value)
            uploadData.append('image', pictureFormData)

            createPost(userId, uploadData, user?.accessToken, dispatch, axiosJWT)
            setValue('')
            setPicture('')
            setPictureFormData('')
            setShowModelCreatePost(false)
        }
    }

    return ( 
        <>
            <div className={cx('body__post__creative')} onClick={handleShowModel}>
                <div className={cx('body__post__creative__avatar')}>
                    <img src={person?.avatar} alt="avatar"/>
                </div>
                <span>Bạn đang nghì gì...?</span>
            </div>
            {showModelCreatePost && (
                <Model>
                    <ModelContent title='Tạo bài viết' bottomToTop onClose={handleCloseModel} className={cx('model__create-post')}>
                        <div className={cx('btn-create')}>
                            <span onClick={handleSubmit}>Đăng</span>
                        </div>
                        <div className={cx('user-create-post')}>
                            <div className={cx('avatar')}>
                                <img src={user?.avatar} alt="avatar"/>
                            </div>
                            <span>{user?.username}</span>
                        </div>
                        <textarea className={cx('title-create-post')} value={value} placeholder="Bạn đang nghĩ gì?" onChange={(e) => setValue(e.target.value)}></textarea>
                        <div className={cx('picture-create-post')}>
                            <img src={picture} className={cx('picture')}/>
                            <label htmlFor="picture-post">
                                <FontAwesomeIcon icon={faImage} />
                            </label>
                            <input type="file" id="picture-post" accept="image/*" onChange={handleChangePicturePost}/>
                        </div>
                    </ModelContent>
                </Model>
            )}
        </>
     );
}

export default memo(CreativePost);