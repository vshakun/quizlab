import React from "react";
import {likePost, removePost, selectCurrentUserUUID, selectUsers} from "../store/storeSlice";
import {useDispatch, useSelector} from "react-redux";
import styles from './Post.module.css';
import {Link} from 'react-router-dom';

function Post(props: any) {
    const dispatch = useDispatch();
    const currentUserUUID = useSelector(selectCurrentUserUUID);
    const users = useSelector(selectUsers);
    const postUUID = props.uuid;
    const authorUUID = props.post.author;
    const authorName = users[authorUUID].name;
    const likedNames = props.post.liked.map((uuid: string) => users[uuid].name);

    return (
        <div className={styles.post}>
            <Link to={`/profile/${authorUUID}`}>
                <p className={styles.author}>{authorName}</p>
            </Link>
            <p className={styles.text}>{props.post.text}</p>
            <p className={styles.text}>Понравилось: {likedNames.join(', ')}</p>
            <button className={styles.heart}
                onClick={() => {
                    dispatch(likePost(postUUID));
                }}
            >
                ❤
            </button>
            <button className={currentUserUUID === authorUUID ? styles.button : styles.hiddenButton}
                    onClick={
                        () => {
                            dispatch(removePost(postUUID));
                        }
                    }
            >
                ❌
            </button>
        </div>
    )
}

export default Post;
