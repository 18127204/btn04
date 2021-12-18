import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { URL_API, INFO, TOKEN } from '../../SettingValue';
import './index.css';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const navigate = useNavigate();
    const [infoProfile, setInfoProfile] = useState({});
    const [userUpdateProfile, setUserUpdateProfile] = useState({
        name: '',
        phone: '',
        mssv: '',
        email: '',
    });
    
    //run 1st
    useEffect(() => {
        getInfoProfile();
    }, [])

    const getInfoProfile = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/profile/api/ShowProfile`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setInfoProfile(res.data[0]);
            setUserUpdateProfile(res.data[0]);
            console.log('getInfoProfile', res.data[0]);
        });
        promise.catch((error) => {
            console.log('getInfoProfile failed', error);
        });
    }

    //
    const handleInput = (event) => {
        let { name, value } = event.target;
        setUserUpdateProfile({
            ...userUpdateProfile,
            [name]: value,
        });
    }

    const handleUpdateProfile = (event) => {
        event.preventDefault();
        let promise = Axios({
            url: `${URL_API}/profile/api/UpdateProfile`,
            method: 'PUT',
            data: userUpdateProfile,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });

        promise.then((result) => {
            setInfoProfile(userUpdateProfile);
            if (result.data.message==='existed') {
                console.log('infoProfile',infoProfile);
                alert('MSSV exist!');
            } else {
                alert('UPDATE success');
            }
            
        })
        promise.catch((err) => {

            console.log('Update Profile failed', err);
        });
    }
    const handleReturn = () => {
        navigate(-1);
    }

    return (
        <div className="container">
            <div className="form-group d-flex justify-content-center" style={{ marginTop: 50 }}>
                <div className="card cardProfile">
                    <h1 className="text-center">Profile</h1>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group sizeInputProfile">
                                    <p>Full name</p>
                                    <input type="text" name="name" className="form-control d-inline sizeInputProfile" onChange={handleInput} defaultValue={infoProfile.name}/>
                                </div>
                                <div className="form-group sizeInputProfile">
                                    <p>Phone</p>
                                    <input type="text" name="phone" className="form-control d-inline sizeInputProfile" onChange={handleInput} defaultValue={infoProfile.phone} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group sizeInputProfile">
                                    <p>Email</p>
                                    <input type="email" name="email" className="form-control d-inline sizeInputProfile"  onChange={handleInput} defaultValue={infoProfile.email}/>
                                </div>
                                <div className="form-group sizeInputProfile">
                                    <p>Id</p>
                                    <input type="text" name="mssv" className="form-control d-inline sizeInputProfile"  onChange={handleInput} defaultValue={infoProfile.mssv}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success w-100" onClick={handleUpdateProfile}>UPDATE PROFILE</button>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-danger w-100" onClick={handleReturn}>TURN BACK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Profile;