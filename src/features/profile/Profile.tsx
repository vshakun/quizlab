import {Post, IPost} from '../post/Post';
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUserUUID, selectUsers, subscribeUser, logOut} from "../auth/authSlice";
import {useParams, Link, Redirect} from "react-router-dom";
import {addPost, selectPosts} from "../feed/feedSlice";
import styles from "./Profile.module.css";

// TODO: consider using type
interface IProfile {
    name: string,
    subscriptions: number,
    subscribed: number,
    posts: {
        [key: string]: IPost;
    }
}

export function Profile() {
    const dispatch = useDispatch();
    const {profileUUID} = useParams();

    const users = useSelector(selectUsers);
    const posts = useSelector(selectPosts);

    const currentUserUUID = useSelector(selectCurrentUserUUID);
    if (!currentUserUUID) {
        return (
            <div>
                <Redirect to='/'/>
            </div>
        )
    }

    const userName = users[profileUUID].name;
    const userSubscriptionCount = users[profileUUID].subscriptions.length;
    const userSubscribersCount = Object.entries(users).reduce((count, [_, user]) => {
        return user.subscriptions.includes(profileUUID) ? count + 1 : count;
    }, 0);

    const userPosts = Object.fromEntries(Object.entries(posts).filter(([_, post]) => post.author === profileUUID));

    const postsArray = Object.entries(userPosts);
    postsArray.sort(([k1, v1], [k2,v2]) => {
        if (v1.timeStamp < v2.timeStamp) {
            return 1;
        } else if (v1.timeStamp > v2.timeStamp) {
            return -1;
        } else {
            return 0;
        }
    })

    const listPosts = postsArray.map(([uuid, post]) => {
        return <Post key={uuid} uuid={uuid} post={post} />
    });

    return (
        <div>
            <p>{userName}, <Link to={`/subscriptions/${profileUUID}`}>{userSubscriptionCount} подписок</Link>, <Link
                to={`/subscribers/${profileUUID}`}>{userSubscribersCount} подписчиков</Link></p>
            <div>
                <button className={currentUserUUID === profileUUID ? styles.hiddenButton : styles.button}
                    onClick={
                        () => {
                            dispatch(subscribeUser(profileUUID));
                        }
                    }
                >
                    {users[currentUserUUID].subscriptions.includes(profileUUID) ? 'Отписаться' : 'Подписаться'}
                </button>
                <Link to={'/'}>
                    <button className={currentUserUUID !== profileUUID ? styles.hiddenButton : styles.button}
                            onClick={
                                () => {
                                    dispatch(logOut());
                                }
                            }
                    >
                        Выйти
                    </button>
                </Link>
            </div>
            <ul>
                {listPosts}
            </ul>
            <div>
                <div>
                    <Link to={"/feed"}>В ленту</Link>
                </div>
                <div>
                    <Link to={"/newPost"}>Добавить пост</Link>
                </div>
            </div>
        </div>
    )
}
