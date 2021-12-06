import React, { useState } from 'react';
import { FaUser, FaLock, FaGooglePlusG } from "react-icons/fa";
import './index.css';
import Axios from 'axios';
import { URL_API, INFO, TOKEN } from '../../SettingValue';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleInputUsername = (event) => {
        setUsername(event.target.value)
    };
    const handleInputPassword = (event) => {
        setPassword(event.target.value)
    };
    
    const handleLogin = (event) => {
        event.preventDefault();
        let promise = Axios({
            url: `${URL_API}/login`,
            method: 'POST',
            data: {username,password}
        });

        promise.then((result) => {
            // console.log('kq tra ve sau login',result.data);
            localStorage.setItem(INFO, JSON.stringify(result.data.content));
            localStorage.setItem(TOKEN, result.data.tokenAccess);
            navigate("/classroom");
        })
        promise.catch((err) => {
            alert('Login again');
            console.log('Error login: ', err);
        });
    };

    const handleRegister = () => {
        navigate("/register");
    }
    return (
        <div className="container">
            <div className="form-group d-flex justify-content-center" style={{ marginTop: 50 }}>
                <div className="card">
                    <h1 className="text-center">Login</h1>
                    <div className="card-body" style={{marginTop:'50px'}}>
                        <div className="form-group sizeformGroup" style={{ borderBottom: 'none' }}>
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                <FaUser />
                                <input type="text" style={{ flexGrow: 1, marginLeft: '10px' }} name="username" className="form-control d-inline sizeInput" placeholder="username"  onChange={handleInputUsername}  />
                            </div>

                        </div>
                        <div className="form-group sizeformGroup" style={{ borderBottom: 'none' }}>
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                <FaLock />
                                <input type="password" name="password" style={{ flexGrow: 1, marginLeft: '10px' }} className="form-control d-inline sizeInput" placeholder="Password" onChange={handleInputPassword}/>

                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary w-100 mt-3" onClick={handleLogin} >SIGN IN</button>
                        </div>
                        <div className="form-group">
                            <p className="text-center">or sign in with</p>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <a className="btn btn-outline iconsocial" href="#">
                                <FaGooglePlusG  style={{fontSize:'32px'}} />
                            </a>
                        </div>
                        <span >
                            <p className="text-center">Don't have an account? <Link to="/register"> SignUp</Link></p> 
                        </span>
                       
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Login;