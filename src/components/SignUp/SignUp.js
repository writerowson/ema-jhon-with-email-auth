import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [createUserWithEmailAndPassword, user] = useCreateUserWithEmailAndPassword(auth)

    const handlEmailBlur = event => {
        setEmail(event.target.value)
    }
    const handlPasswordBlur = event => {
        setPassword(event.target.value)
    }
    const handlconfirmPassword = event => {
        setConfirmPassword(event.target.value)
    }

    // to navigate user in home page after sign in
    if (user) {
        navigate('/shop')
    }

    // to stop reload
    const handlCreateUser = event => {
        event.preventDefault()
        if (password !== confirmPassword) {
            setError('Your passwords are not matched')
            return;
        }
        if (password.length < 6) {
            setError('Password must be 6 charecters or longer')
            return
        }
        createUserWithEmailAndPassword(email, password)
    }



    return (
        <div className='form-container'>
            <div>
                <h2 className='form-title'>Signup</h2>
                <form onSubmit={handlCreateUser} >
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input onBlur={handlEmailBlur} type="email" name="email" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input onBlur={handlPasswordBlur} type="password" name="password" id='1' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input onBlur={handlconfirmPassword} type="password" name="confirm-password" id='2' required />
                    </div>
                    <p style={{ color: 'red' }}>{error}</p>
                    <input className='form-submit' type="submit" value="Sign up" />
                </form>
                <p>Already have an account? <Link className='form-link' to="/login">Login</Link>  </p>

                <div className='line-group'>
                    <div className='line'></div>   or <div className='line'></div>

                </div>
                <button className='btn'> Google with google </button>
            </div>



        </div>
    );
};

export default SignUp;