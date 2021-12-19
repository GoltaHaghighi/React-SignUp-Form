import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { validate } from './validate';
import {notify} from "./toast";
import styles from "./SignUp.module.css";


const SignUp = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPass: "",
        isAccepted: false
    });

    const [errors, setErrors] = useState({});
    const [touch, setTouch] = useState({});

    //we need validation after each setState => use useEffect
    useEffect(() => {
        setErrors(validate(data))
        // console.log(errors)
    }, [data, touch]);

    const changeHandler = (event) => {
        console.log(event.target);
        if (event.target.name === "isAccepted") {
            setData({ ...data, [event.target.name]: event.target.checked })
        } else {
            setData({...data,[event.target.name]: event.target.value})
        }
        // console.log(data);
    }

    const focusHandler = (event) => {
        console.log(event);
        setTouch({ ...touch, [event.target.name]: true });
    }
    
    const submitHandler = (event) => {
        
        event.preventDefault(); //to stop reloading
        if (Object.keys(errors).length === 0) {
            notify("You Signed Up Successfully","success");
        } else {
            notify("Invald Input","error");
            setTouch({
                name: true,
                email:true,
                password:true,
                confirmPass: true,
                isAccepted: true
            })
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2 className={styles.header}>Sign Up</h2>
                <div className={styles.formFields}>
                    <label className={styles.label}>Name</label>
                    <input className={(errors.name && touch.name) ? styles.uncompleted : styles.formInput}
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={changeHandler}
                        onFocus={focusHandler} />
                    {errors.name && touch.name && <span>{errors.name }</span>}
                </div>
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
                <div className={styles.formFields}>
                    <label className={styles.label}>Confirm Password</label>
                    <input className={(errors.confirmPass && touch.confirmPass) ? styles.uncompleted : styles.formInput}
                        type="password"
                        name="confirmPass"
                        value={data.confirmPass}
                        onChange={changeHandler}
                        onFocus={focusHandler} />
                    {errors.confirmPass && touch.confirmPass && <span>{errors.confirmPass }</span>}
                </div>
                <div className={styles.formFields}>
                    <div className={styles.checkBoxContainer}>
                        <label className={styles.label}>I accept terms of privacy policy</label>
                        <input
                            type="checkbox"
                            name="isAccepted"
                            value={data.isAccepted}
                            onChange={changeHandler}
                            onFocus={focusHandler} />
                    </div>
                    {errors.isAccepted && touch.isAccepted && <span>{errors.isAccepted }</span>}
                </div>
                <div className={styles.formButton}>
                    <a href="#">Login</a>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SignUp;