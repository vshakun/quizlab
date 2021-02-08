import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addUserIfNotExists} from './authSlice';
import styles from './Auth.module.css';
import {Link} from 'react-router-dom';

export function Auth() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    return (
        <div>
            <div className={styles.row}>
                <label>
                    <p>Введите имя</p>
                    <input
                        className={styles.textbox}
                        aria-label="Введите имя"
                        type="text"
                        maxLength={12}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <div>
                    <Link
                        to={'/feed'}
                        onClick={
                            () => {
                                dispatch(addUserIfNotExists(String(name) || ''));
                            }
                        }
                    >
                        <button disabled={name.length <= 3}>Продолжить</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
