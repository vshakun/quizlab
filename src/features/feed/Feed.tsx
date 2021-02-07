import React from 'react';
import {Post} from '../post/Post';
import {useSelector} from 'react-redux';
import {selectPosts} from './feedSlice';

export function Feed() {
    const posts = useSelector(selectPosts);
    const listPosts = Object.entries(posts).map(([key, post]) => {
        return <Post key={key} post={post} />
    });

    return (
        <div>
            <div>
                <button>Все посты</button>
                <button>Подписки</button>
            </div>
            <div>
                {listPosts}
            </div>
            <div>
                <button>В профиль</button>
            </div>
        </div>
    );
}
