import Post from '../post/Post';
import React from "react";
import {useSelector} from "react-redux";
import {selectCurrentUserUUID, selectPosts} from "../store/storeSlice";
import {Redirect, useParams} from "react-router-dom";
import ProfileActionButton from "../profileActionButton/ProfileActionButton";
import ProfileHeader from "../profileHeader/ProfileHeader";
import ProfileFooter from "../profileFooter/ProfileFooter";

function Profile() {
    const {profileUUID} = useParams();
    const posts = useSelector(selectPosts);

    const currentUserUUID = useSelector(selectCurrentUserUUID);
    if (!currentUserUUID) {
        return <Redirect to='/'/>
    }

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

    const componentList = userPosts.map(([uuid, post]) => {
        return <Post key={uuid} uuid={uuid} post={post}/>
    });

    return (
        <div>
            <ProfileHeader profileUUID={profileUUID} />
            <ProfileActionButton profileUUID={profileUUID} />
            <ul>
                {componentList}
            </ul>
            <ProfileFooter />
        </div>
    )
}

export default Profile;
