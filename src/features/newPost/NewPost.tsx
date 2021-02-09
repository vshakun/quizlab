import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {useDispatch} from 'react-redux';
import {selectCurrentUserUUID} from "../auth/authSlice";
import {IPost} from "../post/Post";
import {addPost} from "../feed/feedSlice";
import {ProfileButton} from "../profileButton/ProfileButton";

export function NewPost() {
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
            <ProfileButton userUUID={currentUserUUID}/>
        </div>
    )
}
