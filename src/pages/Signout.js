import React, { useState } from 'react';

const Signout = () => {
    const [user,setUser] = useState("")
    const [password,setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)

    return (
        <div className='login-container col-12 col-sm-4'>
            <div className='title'>Login</div>
            <div className='text-title'>username</div>
            <input type ='text' 
            placeholder='Username...' 
            className='login-input'
            value={user}
            onChange={(event) => setUser(event.target.value)}    
            />
            <div>
                <input type={isShowPassword === true ? 'text' : 'password'}
                placeholder='Password...' 
                className='login-input'
                value={password}
                onChange={(event) => setPassword(event.target.value)}    
                />
                <i className={isShowPassword === true ? "fas fa-eye" : "fas fa-eye-slash"} onClick={() => setIsShowPassword(!isShowPassword)}></i>
            </div>
            <button className={`login-input ${user && password ? "active" : ""}`} disabled={user && password ? false : true}>Login</button>
            <div className='Go-back'>
                <i className="fas fa-angle-double-left"></i>
                Go back
            </div>
        </div>
    );
};

export default Signout;