import React, { useState } from 'react'
import Axios from 'axios';
import { Redirect } from 'react-router';
import { URL_API, INFO, TOKEN } from '../../SettingValue';
export default function Login(props) {
    let [userLogin, setUserLogin] = useState({
        username: "",
        password: "",
    });

    const handleInput = (event) => {
        let { name, value } = event.target;
        setUserLogin({
            ...userLogin,
            [name]: value,
        });
    };

    const handleLogin = (event) => {
        event.preventDefault();
        let promise = Axios({
            url: `${URL_API}/login`,
            method: 'POST',
            data: userLogin
        });

        promise.then((result) => {
            // console.log('kq tra ve sau login',result.data);
            localStorage.setItem(INFO, JSON.stringify(result.data.content));
            localStorage.setItem(TOKEN, result.data.tokenAccess);
            props.history.push("/classroom");
        })
        promise.catch((err) => {
            alert('dang nhap fail rui');
            console.log('loi nek: ', err);
        });
    };

    const handleRegister = () => {
        props.history.push("/register");
    }
    return (
        <div>
            <div className="container">
                <h2 className='text-center'>Đăng nhập</h2>
                <form>
                    <div className="form-group">
                        <label>Tài khoản</label>
                        <input type="text" name="username" className="form-control" onChange={handleInput} />
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input type="password" name="password" className="form-control" onChange={handleInput} />
                    </div>
                    <button className="btn btn-primary" onClick={handleLogin}>Đăng nhập</button>
                    <button className="btn btn-success" onClick={handleRegister}>Đăng ký</button>
                </form>
            </div>

        </div>

    );
}
