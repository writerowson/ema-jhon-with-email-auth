import React, { useState } from 'react';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';

import auth from '../../firebase.init';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

const LogIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // copied from firebase
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    // auto import
    const navigate = useNavigate()

    const handleEmailBlur = e => {
        setEmail(e.target.value)
    }
    const handlePasswordBlur = e => {
        setPassword(e.target.value)
    }

    // to navigate user in home page after sign in
    if (user) {
        navigate('/shop')
    }
    // to stop loading page
    const handleUserSignIn = e => {
        e.preventDefault()
        // auto imported
        signInWithEmailAndPassword(email, password)
    }
    return (
        <div className='form-container'>
            <div>
                <h2 className='form-title'>Login</h2>
                <form onSubmit={handleUserSignIn}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input onBlur={handleEmailBlur} type="email" name="email" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input onBlur={handlePasswordBlur} type="password" name="password" required />
                    </div>
                    {/* for show error msg ? for defined error*/}
                    <p style={{ color: 'red' }}>{error?.message}</p>
                    {
                        loading && <p>Loading...</p>

                    }
                    <input className='form-submit' type="submit" value="Login" />
                </form>
                <p>New to Ema Zon? <Link className='form-link' to="/signup">Create an account</Link>  </p>

                <div className='line-group'>
                    <div className='line'></div>   or <div className='line'></div>

                </div>
                <button className='btn'> Google with google </button>
            </div>



        </div>
    );
};

export default LogIn;