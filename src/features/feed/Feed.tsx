import React, {useState} from 'react';
import {IUserPost, Post} from '../post/Post';
import {useDispatch, useSelector} from 'react-redux';
import {likePost, selectPosts} from './feedSlice';
import {selectCurrentUserUUID, selectUsers} from "../auth/authSlice";
import {Link, Redirect} from 'react-router-dom';
import styles from './Feed.module.css';

export function Feed() {
    const [subscriptionsMode, setSubscriptionsMode] = useState(false);
    const currentUserUUID = useSelector(selectCurrentUserUUID);
    const users = useSelector(selectUsers);
    const posts = useSelector(selectPosts);

    if (currentUserUUID === null) {
        return (
            <Redirect to='/'/>
        )
    }

    const currentUser = users[currentUserUUID];
    if (!currentUserUUID) {
        return (
            <Redirect to='/'/>
        )
    }

    let postsArray = Object.entries(posts);
    postsArray.sort(([k1, v1], [k2, v2]) => {
        if (v1.timeStamp < v2.timeStamp) {
            return 1;
        } else if (v1.timeStamp > v2.timeStamp) {
            return -1;
        } else {
            return 0;
        }
    });

    const currentUserName = currentUser.name;
    const currentUserSubscriptions = currentUser.subscriptions.map((uuid) => users[uuid].name);
    const subscriptionPostsArray = postsArray.filter(([uuid, post]) => post.author === currentUserName || currentUserSubscriptions.includes(post.author));
    const postsComponentsArray = postsArray.map(([uuid, post]) => {
        return <Post key={uuid} post={post}/>
    });
    const subscriptionPostsComponentsArray = subscriptionPostsArray.map(([uuid, post]) => {
        return <Post key={uuid} post={post}/>
    });


    return (
        <div>
            <div>
                <button className={subscriptionsMode ? styles.button : styles.boldButton}
                        onClick={
                            () => {
                                setSubscriptionsMode(false);
                            }
                        }
                >
                    Все посты
                </button>
                <button className={subscriptionsMode ? styles.boldButton : styles.button}
                        onClick={
                            () => {
                                setSubscriptionsMode(true);
                            }
                        }
                >
                    Подписки
                </button>
            </div>
            <div>
                {subscriptionsMode ? subscriptionPostsComponentsArray : postsComponentsArray}
            </div>
            <div>
                <button>
                    <Link to={`/profile/${currentUserUUID}`}>В профиль</Link>
                </button>
            </div>
        </div>
    );
}
