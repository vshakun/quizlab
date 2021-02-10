import styles from "./ProfileActionButton.module.css";
import {logOut, selectCurrentUserUUID, selectUsers, subscribeUser} from "../store/storeSlice";
import {Link, Redirect} from "react-router-dom";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

function ProfileActionButton(props: any) {
    const profileUUID = props.profileUUID;
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);

    const currentUserUUID = useSelector(selectCurrentUserUUID);
    if (!currentUserUUID) {
        return <Redirect to='/'/>
    }

    return (
        <div>
            <button
                className={currentUserUUID === profileUUID ? styles.hiddenButton : styles.button}
                onClick={() => {
                    dispatch(subscribeUser(profileUUID));
                }}
            >
                {
                    users[currentUserUUID].subscriptions.includes(profileUUID) ?
                        'Отписаться' : 'Подписаться'
                }
            </button>
            <Link to={'/'}>
                <button
                    className={currentUserUUID !== profileUUID ? styles.hiddenButton : styles.button}
                    onClick={() => {
                        dispatch(logOut());
                    }}
                > Выйти
                </button>
            </Link>
        </div>
    )
}

export default ProfileActionButton;
