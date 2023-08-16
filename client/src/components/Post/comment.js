import classNames from "classnames/bind";
import { memo, useState } from "react";



import styles from './Post.module.scss'
import ModelComment from "./ModelComment";

const cx = classNames.bind(styles)

function Comment({data}) {

    const [showModelComment, setShowModelComment] = useState(false)

    const handleShowComment = () => {
        setShowModelComment(true)
    }


    return ( 
        <>
            <div className={cx('comments')} onClick={handleShowComment}>
                Xem bình luận
            </div>
            {showModelComment && (
                <ModelComment setShowModelComment={setShowModelComment} data={data}/>
            )}
        </>
    );
}

export default memo(Comment);