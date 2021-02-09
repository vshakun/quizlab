import React, {useState} from 'react';
import {Post} from '../post/Post';
import {useSelector} from 'react-redux';
import {selectPosts} from './feedSlice';
import {selectCurrentUserUUID, selectUsers} from "../auth/authSlice";
import {Redirect} from 'react-router-dom';
import styles from './Feed.module.css';
import {ProfileButton} from "../profileButton/ProfileButton";

export function Feed() {
    const [subscriptionsMode, setSubscriptionsMode] = useState(false);
    const currentUserUUID = useSelector(selectCurrentUserUUID);
    const users = useSelector(selectUsers);
    const posts = useSelector(selectPosts);

    if (!currentUserUUID) {
        return <Redirect to='/'/>
    }

    let postsArray = Object.entries(posts);
    postsArray.sort(([, v1], [, v2]) => {
        if (v1.timeStamp < v2.timeStamp) {
            return 1;
        } else if (v1.timeStamp > v2.timeStamp) {
            return -1;
        } else {
            return 0;
        }
    })

    const subscriptionPostsArray = postsArray.filter(([, post]) =>
        post.author === currentUserUUID || users[currentUserUUID].subscriptions.includes(post.author)
    );

    const postsComponentsArray = postsArray.map(([uuid, post]) => {
        return <Post key={uuid} uuid={uuid} post={post}/>
    });

    const subscriptionPostsComponentsArray = subscriptionPostsArray.map(([uuid, post]) => {
        return <Post key={uuid} uuid={uuid} post={post}/>
    });

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
            <div>
                {subscriptionsMode ? subscriptionPostsComponentsArray : postsComponentsArray}
            </div>
            <ProfileButton userUUID={currentUserUUID}/>
        </div>
    );
}
