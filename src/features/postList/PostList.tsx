import React from "react";
import {Post} from "../post/Post";
import {useSelector} from "react-redux";
import {selectCurrentUserUUID, selectPosts, selectUsers} from "../store/storeSlice";
import {Redirect} from "react-router-dom";

export function PostList(props: any) {
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

    const subscriptionPostsComponentsArray = subscriptionPostsArray.map(([uuid, post]) => {
        return <Post key={uuid} uuid={uuid} post={post}/>
    });

    const postsComponentsArray = postsArray.map(([uuid, post]) => {
        return <Post key={uuid} uuid={uuid} post={post}/>
    });

    return (
        <div>
            {props.subscriptionsMode ? subscriptionPostsComponentsArray : postsComponentsArray}
        </div>
    )
}
