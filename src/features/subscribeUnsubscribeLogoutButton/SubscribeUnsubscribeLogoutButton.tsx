import styles from "./SubscribeUnsubscribeLogoutButton.module.css";
import {logOut, selectUsers, subscribeUser} from "../auth/authSlice";
import {Link} from "react-router-dom";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

export function SubscribeUnsubscribeLogoutButton(props: any) {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);

    const currentUserUUID = props.currentUserUUID;
    const profileUUID = props.profileUUID;

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