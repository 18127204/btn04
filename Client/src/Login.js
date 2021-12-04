import React, {useState, useEffect} from 'react';
import { useNavigate, Route} from 'react-router-dom'

import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import { FacebookLoginButton } from "react-social-login-buttons";
import { Link } from 'react-router-dom';

import './index.css'
const Login = () => {

    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')
    let history = useNavigate();
    const login = () => {
        localStorage.setItem("accessToken", true)

        history('/classes')
    }
    return (
        <Form className="login-form">
            <FormGroup>
                <Label>User</Label>
                <Input type="input" placeholder="Username" />
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input type="password" placeholder="Password" />
            </FormGroup>
            <Button className="btn-lg btn-dark col-12" onClick={login}>
                Log in
            </Button>
            <div className="text-center pt-3">
                Or continue with your social account
            </div>
            <FacebookLoginButton className="mt-3 mb-3" />
            <div className="text-center">
                <Link to="/sign-up">Sign up</Link>
                <span className="p-2">|</span>
                <a href="/sign-up">Forgot Password</a>
            </div>
        
        </Form>
      );
    
}
export default Login;