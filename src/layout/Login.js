import React, { useEffect, useState } from 'react';
import { loginApi, fetchUserProfile } from '../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import { ScaleLoader } from "react-spinners"
import { Route, Routes, useNavigate} from "react-router-dom"
import Adminwork from './../layout/AdminWork';
import Upper from './../layout/Upper';
import Trainer from './../layout/Trainer';
import Trainee from './../layout/Trainee';


const Signout = () => {
    const  navigate = useNavigate();
    const [data,setData] = useState(null);
    const [showLoad,isShowLoad] = useState(false)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)

    const HandleLogin = async () => {
        // setTimeout(isShowLoad(true), 2000);
        if(!email || !password){
            toast.error("Email và mật khẩu là bắt buộc!");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Yêu cầu nhập tài khoản có dạng email!");
            return;
        }
        let res = await loginApi(email,password);
        // console.log("res login >>",res)
        if(res && res.access_token ) {
            let datauser = await fetchUserProfile(res.access_token);
            console.log("Datauser >>>",datauser);
            if(datauser && datauser.isDeleted === false){
                localStorage.setItem("role", datauser.role);
                localStorage.setItem("access_token", res.access_token);
                localStorage.setItem("refresh_token", res.access_token);
                localStorage.setItem("idUser", datauser.id);
                
                if(localStorage.getItem("role") === "ADMIN"){
                    navigate("/Home");
                    toast.success("Đăng nhập thành công");
                }
                else if(localStorage.getItem("role") === "UPPER"){
                    navigate("/Home");
                    toast.success("Đăng nhập thành công");
                }
                else if(localStorage.getItem("role") === "TRAINER"){
                    navigate("/Home");
                    toast.success("Đăng nhập thành công");
                }
                else if(localStorage.getItem("role") === "TRAINEE"){
                    navigate("/Home");
                    toast.success("Đăng nhập thành công");
                }
            } else {
                toast.error("Email hoặc mật khẩu không chính xác!");
            }
        } else {
            if(res && res.status === 400){
                toast.error("Yêu cầu nhập đúng tài khoản, mật khẩu");
            }
            if(res && res.status === 403){
                toast.error("Yêu cầu nhập đúng tài khoản, mật khẩu");
            }
        }
    };
    const override = {
        position: "absolute",
        top: "0",
        left: "0",
        textAlign: "center",
        right: "0",
        bottom: "0",
        backgroundColor: "rgb(0 0 0 /30%)",
        zIndex: "9999",
        paddingLeft: "-7px",
        paddingTop: "240px",
    }
    const RouteDirect = () => {
            if(localStorage.getItem("role") === "ADMIN"){
                return(
                    <Adminwork></Adminwork>
                )
            }
            else if(localStorage.getItem("role") === "UPPER"){
                return(
                    <Upper></Upper>
                )
            }
            else if(localStorage.getItem("role") === "TRAINER"){
                return(
                    <Trainer></Trainer>
                )
            }
            else if(localStorage.getItem("role") === "TRAINEE"){
                return(
                    <Trainee></Trainee>
                )
            }
            else{
                return(
                    <div>
                    <div className='login-container col-12 col-sm-4'>
            <div className='title'>Login</div>
            <div className='text-title'>Email or username</div>
            <input type ='text' 
            placeholder='Email or username' 
            className='login-input'
            value={email}
            onChange={(event) => setEmail(event.target.value)}    
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
            <button className={`login-input ${email && password ? "active" : ""}`} 
            disabled={email && password ? false : true}
            onClick={() => HandleLogin()}
            >
            Login</button>
    
    
            <div className='Go-back'>
                <i className="fas fa-angle-double-left"></i>
                Go back
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
    
                </div>
                <ScaleLoader 
                loading={showLoad} 
                cssOverride={override} 
                color='#36d7b7' 
                timingFunction="ease-in-out"   
                />
                            </div>
                        )
                    }
            }
    return (
        <div>
            {RouteDirect()}
        </div>
    );
};

export default Signout;