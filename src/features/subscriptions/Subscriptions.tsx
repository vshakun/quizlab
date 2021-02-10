import {useParams} from "react-router-dom";
import React from "react";
import PeopleList from "../peopleList/PeopleList";
import {useSelector} from "react-redux";
import {selectUsers} from "../store/storeSlice";

function Subscriptions() {
    const {profileUUID} = useParams();
    const users = useSelector(selectUsers);
    const userSubscriptions = users[profileUUID].subscriptions;

    return (
        <PeopleList people={userSubscriptions} profile={profileUUID} />
    )
}

export default Subscriptions;
