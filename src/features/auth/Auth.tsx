import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addUserIfNotExists} from './authSlice';
import styles from './Auth.module.css';

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
                    <button
                        className={styles.button}
                        disabled={name.length <= 3}
                        onClick={() =>
                            dispatch(addUserIfNotExists(String(name) || ''))
                        }
                    >
                        Продолжить
                    </button>
                </div>
            </div>
        </div>
    );
}
