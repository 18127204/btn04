import React, { useState } from 'react';
import { FaUser, FaLock, FaGooglePlusG } from "react-icons/fa";
import './Login.css';
import Axios from 'axios';
import { URL_API, INFO, TOKEN } from '../../SettingValue';
export default function Login() {
    return (
        <div className="container">
            <div className="form-group d-flex justify-content-center" style={{ marginTop: 50 }}>
                <div className="card">
                    <h1 className="text-center">Login</h1>
                    <div className="card-body">
                        <div className="form-group sizeformGroup">
                            <div className="d-inline">
                                <FaUser/>
                            </div>
                            <input type="text" name id className="form-control d-inline sizeInput" placeholder="Username" />
                        </div>
                        <div className="form-group sizeformGroup">
                            <div className="d-inline">
                                <FaLock/>
                            </div>
                            <input type="password" name id className="form-control d-inline sizeInput" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary w-100">SIGN IN</button>
                        </div>
                        <div className="form-group">
                            <p className="text-center">or sign in with</p>
                        </div>
                        <div className="form-group">
                            <a className="btn btn-outline iconsocial" href="#">
                                <FaGooglePlusG/>
                            </a>
                        </div>
                        <div className="form-group">
                            <p className="text-center">Don't have an account?</p>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success w-100">SIGN UP</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
