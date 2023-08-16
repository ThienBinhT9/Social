import classNames from "classnames/bind";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from '../profile.module.scss'
import Model, {ModelContent} from "../../../components/Model";
import { updateUser } from '../../../redux/apiRequests'
import createAxios from '../../../utils/axiosInstance'
import { loginSuccess } from "../../../redux/authSlice";

const cx = classNames.bind(styles)

function EditProfile({setShowModel}) {

    const user = useSelector(state => state.auth.login.currentUser)
    const person = useSelector(state => state.user.getUser.user)

    const [avatar, setAvatar] = useState(person?.avatar)
    const [coverImage, setCoverImage] = useState(person?.coverImage)
    const [avatarForm, setAvatarForm] = useState(null)
    const [coverImageForm, setCoverImageForm] = useState(null)
    const dispatch = useDispatch()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)

    const handleChangeAvatar = (e) => {
        const _avatar = e.target.files[0]
        setAvatarForm(_avatar)
        const render = new FileReader();
        render.onload = (e) => {
            const imageData = e.target.result
            setAvatar(imageData)
        }

        render.readAsDataURL(_avatar)
    }

    const handleChangeCoverImage = (e) => {
        const _coverImage = e.target.files[0]
        setCoverImageForm(_coverImage)
        const render = new FileReader();
        render.onload = (e) => {
            const imageData = e.target.result
            setCoverImage(imageData)
        }

        render.readAsDataURL(_coverImage)
    }

    const handleUpdateAvatar = () => {
        const upload = new FormData();
        upload.append('avatar', avatarForm)

        updateUser(user?._id, upload, user?.accessToken, dispatch, axiosJWT)
    }

    const handleUpdateCoverImage = () => {
        const upload = new FormData();
        upload.append('coverImage', coverImageForm)
        updateUser(user?._id, upload, user?.accessToken, dispatch, axiosJWT)
    }

    const handleCloseModel = () => {
        setShowModel(false)
    }

    return ( 
        <>
            <Model>
                <ModelContent title={'Chỉnh sửa trang cá nhân'} rightToLeft className={cx('model__edit__pc')} onClose={handleCloseModel}>
                    <div className={cx('edit__section')}>
                        <div className={cx('edit__section__header')}>
                            <h4>Ảnh đại diện</h4>
                            <label htmlFor="avatar">Chỉnh sửa</label>
                            <input id="avatar" type="file" accept='image/*' onChange={handleChangeAvatar}/>
                        </div>
                        <div className={cx("edit__section__body")}>
                            <div className={cx('edit__section__body--avatar')}>
                                <img src={avatar} alt="avatar"/>
                            </div>
                        </div>
                        {(person?.avatar !== avatar) && (
                            <div className={cx('edit__section__footer__save')}>
                                <span onClick={handleUpdateAvatar}>Lưu</span>
                            </div>
                        )}
                    </div>

                    <div className={cx('edit__section')}>
                        <div className={cx('edit__section__header')}>
                            <h4>Ảnh bìa</h4>
                            <label htmlFor="image-cover">Chỉnh sửa</label>
                            <input id="image-cover" type="file" accept='image/*' onChange={handleChangeCoverImage}/>
                        </div>
                        <div className={cx("edit__section__body")}>
                            <div className={cx('edit__section__body--image-cover')}>
                                <img src={coverImage} alt="coverImage"/>
                            </div>
                        </div>
                        {(person?.coverImage !== coverImage) && (
                            <div className={cx('edit__section__footer__save')}>
                                <span onClick={handleUpdateCoverImage}>Lưu</span>
                            </div>
                        )}
                    </div>

                    <div className={cx('edit__section')}>
                        <div className={cx('edit__section__header')}>
                            <h4>Sở thích</h4>
                            <label>Chỉnh sửa</label>
                        </div>
                        <div className={cx("edit__section__body")}>
                            {person?.favorites.length === 0 ? <h4>Chưa có</h4> : <div></div>}
                        </div>
                    </div>
                </ModelContent>
            </Model>

        </>
     );
}

export default memo(EditProfile);