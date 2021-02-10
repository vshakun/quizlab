import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {selectCurrentUserUUID} from "../store/storeSlice";
import styles from './Feed.module.css';
import ProfileButton from "../profileButton/ProfileButton";
import PostList from "../postList/PostList";

function Feed() {
    const [subscriptionsMode, setSubscriptionsMode] = useState(false);
    const currentUserUUID = useSelector(selectCurrentUserUUID);

    return (
        <div>
            <div>
                <button
                    className={subscriptionsMode ? styles.button : styles.boldButton}
                    onClick={() => {
                        setSubscriptionsMode(false);
                    }}
                > Все посты
                </button>
                <button
                    className={subscriptionsMode ? styles.boldButton : styles.button}
                    onClick={() => {
                        setSubscriptionsMode(true);
                    }}
                > Подписки
                </button>
            </div>
            <PostList subscriptionsMode={subscriptionsMode}/>
            <ProfileButton userUUID={currentUserUUID}/>
        </div>
    );
}

export default Feed;
