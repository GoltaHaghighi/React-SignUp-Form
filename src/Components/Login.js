import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { validate } from './validate';
import {notify} from "./toast";
import styles from "./SignUp.module.css";
import { Link } from 'react-router-dom';


const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [touch, setTouch] = useState({});

    //we need validation after each setState => use useEffect
    useEffect(() => {
        setErrors(validate(data, "Login"));
        // console.log(errors)
    }, [data, touch]);

    const changeHandler = (event) => {
        // console.log(event.target);
        setData({...data,[event.target.name]: event.target.value})
        // console.log(data);
    }

    const focusHandler = (event) => {
        // console.log(event);
        setTouch({ ...touch, [event.target.name]: true });
    }
    
    const submitHandler = (event) => {
        
        event.preventDefault(); //to stop reloading
        if (Object.keys(errors).length === 0) {
            notify("You LogedIn Successfully","success");
        } else {
            notify("Invald Input","error");
            setTouch({
                email:true,
                password:true
            })
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2 className={styles.header}>Log In</h2>
                
                <div className={styles.formFields}>
                    <label className={styles.label}>Email</label>
                    <input className={(errors.email && touch.email) ? styles.uncompleted : styles.formInput}
                        type="text"
                        name="email"
                        value={data.email}
                        onChange={changeHandler}
                        onFocus={focusHandler} />
                    {errors.email && touch.email && <span>{errors.email }</span>}
                </div>
                <div className={styles.formFields}>
                    <label className={styles.label}>Password</label>
                    <input className={(errors.password && touch.password) ? styles.uncompleted : styles.formInput}
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={changeHandler}
                        onFocus={focusHandler} />
                    {errors.password && touch.password && <span>{errors.password }</span>}
                </div>
                
                <div className={styles.formButton}>
                    <Link to="/signup">Sign Up</Link>
                    <button type="submit">Login</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;