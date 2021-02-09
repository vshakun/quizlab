import {useParams} from "react-router-dom";
import React from "react";
import {PeopleList} from "../peopleList/PeopleList";
import {useSelector} from "react-redux";
import {selectUsers} from "../auth/authSlice";

export function Subscribers() {
    const {profileUUID} = useParams();
    const users = useSelector(selectUsers);
    const userSubscribers = Object.entries(users)
        .filter(([, user]) => user.subscriptions.includes(profileUUID))
        .map(([uuid]) => uuid);

    return (
        <PeopleList list={userSubscribers} profile={profileUUID} />
    )
}
