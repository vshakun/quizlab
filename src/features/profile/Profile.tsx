import Post from '../post/Post';
import React from "react";
import {useSelector} from "react-redux";
import {selectCurrentUserUUID, selectUsers, selectPosts} from "../store/storeSlice";
import {Link, Redirect, useParams} from "react-router-dom";
import ProfileActionButton from "../profileActionButton/ProfileActionButton";

function Profile() {
    const {profileUUID} = useParams();
    const users = useSelector(selectUsers);
    const posts = useSelector(selectPosts);

    const currentUserUUID = useSelector(selectCurrentUserUUID);
    if (!currentUserUUID) {
        return <Redirect to='/'/>
    }

    const userSubscribersCount = Object.entries(users).reduce((count, [_, user]) => {
        return user.subscriptions.includes(profileUUID) ? count + 1 : count;
    }, 0);

    const userPosts = Object.entries(Object.fromEntries(Object.entries(posts)
        .filter(([, post]) => post.author === profileUUID)));

    userPosts.sort(([, v1], [, v2]) => {
        if (v1.timeStamp < v2.timeStamp) {
            return 1;
        } else if (v1.timeStamp > v2.timeStamp) {
            return -1;
        } else {
            return 0;
        }
    })

    const listPosts = userPosts.map(([uuid, post]) => {
        return <Post key={uuid} uuid={uuid} post={post}/>
    });

    return (
        <div>
            <p>
                {users[profileUUID].name},
                <Link to={`/subscriptions/${profileUUID}`}>{users[profileUUID].subscriptions.length} подписок</Link>,
                <Link to={`/subscribers/${profileUUID}`}>{userSubscribersCount} подписчиков</Link>
            </p>
            <ProfileActionButton profileUUID={profileUUID} />
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

export default Profile;
