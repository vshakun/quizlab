import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {useSelector} from "react-redux";
import {useDispatch} from 'react-redux';
import {addUserIfNotExists, selectCurrentUserUUID} from "../auth/authSlice";
import {IPost} from "../post/Post";
import { addPost } from "../feed/feedSlice";
import styles from "../auth/Auth.module.css";

export function NewPost(props: any) {
    const dispatch = useDispatch();
    const currentUserUUID = useSelector(selectCurrentUserUUID);
    const [text, setText] = useState('');

    if (!currentUserUUID) {
        return (
            <div>
                <Redirect to='/'/>
            </div>
        )
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <button
                    onClick={
                        () => {
                            const post: IPost = {
                                author: String(currentUserUUID),
                                text: text,
                                liked: [],
                                timeStamp: Date.now()
                            }
                            dispatch(addPost(post));
                        }
                    }
                >
                    Опубликовать
                </button>
            </div>
            <Link to={`/profile/${currentUserUUID}`}>
                <button>В профиль</button>
            </Link>
        </div>
    )
}
