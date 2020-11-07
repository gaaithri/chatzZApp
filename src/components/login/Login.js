import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { auth, provider } from "../Firebase";
import { actionTypes } from '../stateprovider/reducer';
import { useStateValue } from '../stateprovider/StateProvider';

import "./Login.css";
function Login() {
    const [{}, dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch((error) => alert(error.message));
    };
    return (
        <div className="login">

            <div className="login__container">
                <img
                    src="https://www.pinclipart.com/picdir/big/371-3715212_live-chat-clipart-chat-box-purple-chat-box.png"
                    alt="" />

                <div className="login__text">
                    <h1> Sign into ChatzZApp</h1>
                </div>
                <Button onClick={signIn}>
                    Sign in with Google
            </Button>
            </div>
        </div>
    );
}

export default Login;

