import {Post, IPost} from '../post/Post';
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUserUUID, selectUsers, subscribeUser} from "../auth/authSlice";
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
    const {uuid} = useParams();

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

    const userName = users[uuid].name;
    const userSubscriptionCount = users[uuid].subscriptions.length;

    const userPosts = Object.fromEntries(Object.entries(posts).filter(([uuid, post]) => post.author === userName));

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
        return <Post uuid={uuid} post={post} />
    });

    return (
        <div>
            <p>{userName}, <a href={'/subscriptions'}>{userSubscriptionCount} подписок</a>, <a
                href={'/subscriptions'}>{userSubscriptionCount} подписчиков</a></p>
            {/*<div>*/}
            {/*    <p>{userName}</p>*/}
            {/*</div>*/}
            <div>
                <button className={currentUserUUID === uuid ? styles.hiddenButton : styles.button}
                    onClick={
                        () => {
                            dispatch(subscribeUser(uuid));
                        }
                    }
                >
                    {users[currentUserUUID].subscriptions.includes(uuid) ? 'Отписаться' : 'Подписаться'}
                </button>
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
