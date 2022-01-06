import React from 'react';
import { Navigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Header from '../../Component/Header/Header';
import { INFO, TOKEN } from '../../SettingValue';
export default function ViewProfile(props) {

    const handleReturn = () => {
        props.history.goBack();
    }

    if (localStorage.getItem(TOKEN)) {
        console.log('tokeninffo',localStorage.getItem(INFO));
        const {hoten,diachi,email,sodienthoai,studentid} =JSON.parse(localStorage.getItem(INFO)) ;
        return (
            <div>
                <Header/>
                <div className='container'>
                    <div className="row">
                        <p className='text-center'>Thông tin cá nhân</p>
                        <div className='col-md-6'>
                            <div className="form-group">
                                <p>Họ và tên</p>
                                <input type="text" className="form-control" value={hoten} readOnly/>
                            </div>
                            <div className="form-group">
                                <p>Địa chỉ</p>
                                <input type="text" className="form-control" value={diachi} readOnly/>
                            </div>
                            <div className="form-group">
                                <p>Mã số</p>
                                <input type="text" className="form-control" value={studentid} readOnly/>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-group">
                                <p>Email</p>
                                <input type="email" className="form-control" value={email} readOnly/>
                            </div>
                            <div className="form-group">
                                <p>Số điện thoại</p>
                                <input type="text" className="form-control" value={sodienthoai} readOnly/>
                            </div>
                        </div>

                    </div>
                    <button className='btn btn-danger' style={{ width: '50%', margin: '0 auto' }} onClick={handleReturn} >Quay lại</button>
                </div>


            </div>

        )
    }
    else {
        return <Navigate to='/' />
    }

}
