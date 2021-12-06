import React, { Component, useState, useEffect } from 'react'
import { URL_API, INFO, TOKEN } from '../../SettingValue';
import Header from '../Header/Header';
import Classroom from '../Classroom/index';
import Axios from 'axios';
import CreateClass from '../CreateClass/index';
import JoinClass from '../JoinClass/index';
import { Navigate } from 'react-router-dom';


const ClassRoom = () => {

    const [listClassroom, setListClassrom] = useState([])
    const getAllClassRoom = () => {
        let promise = Axios({
            url: `${URL_API}/classroom/api/GetALLListClassroom/${JSON.parse(localStorage.getItem(INFO)).id}`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((result) => {
            setListClassrom(result.data)
            console.log('get all class: ',listClassroom);
        });
        promise.catch((er) => {
            console.log("Erroor classroom", er);
        })
    }

    const handleAddNewClass = (cl) => {
        let tempClass = [...listClassroom];
        let id_nguoithamgia = JSON.parse(localStorage.getItem(INFO)).id;
        let dLink = new Date();
        let duonglink = '/classroom/' + dLink.getTime();
        // let dataSend={...cl,id_nguoithamgia,duonglink,id_chuphong:id_nguoithamgia};
        let dataSend = { ...cl, id_nguoithamgia, duonglink };
        tempClass.push(dataSend);
        let promise = Axios({
            method: 'POST',
            url: `${URL_API}/classroom/api/AddNewClassroom`,
            data: dataSend,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setListClassrom(tempClass)
            console.log('Create Class success', dataSend);
        });
        promise.catch((error) => {
            console.log('Create Class success fail', error);
        });
    }


    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            getAllClassRoom()
        }
    }, [])
 

    const displayListClass = (lst) => {
        console.log('Length: ', lst.length);
        if (lst.length) {
            return lst.map((cl, index) => {
                return (
                    <div className="col-md-3" key={index}>
                        <Classroom cl={cl} />
                    </div>
                );
            })
        }
        else {
            return (<div></div>)
        }
    }

    //hmm
    const handleJoinClass = (inputLink) => {
        let tempClass = [...listClassroom];
        let id_nguoithamgia = JSON.parse(localStorage.getItem(INFO)).id;

        let words = inputLink.split('/');
        let resultFind = words[words.length - 1];

        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/classroom/api/joinClassroom/${resultFind}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((result) => {
            console.log('Join class sucess', result.data);
            tempClass.push(result.data[0]);
            setListClassrom(tempClass)
            let promise1 = Axios({
                method: 'POST',
                url: `${URL_API}/classroom/api/AddPeopleClassroom`,
                data: { id_nguoithamgia: id_nguoithamgia, duonglink: resultFind },
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
            });
            promise1.then((res) => {
                console.log('add people to class thanh cong');
            });
            promise1.catch((error) => {
                console.log('add people to class that bai', error);
            })

        });
        promise.catch((error) => {
            console.log('tao class that bai', error);
        });

    }
    if (localStorage.getItem(TOKEN)) {
        return (
            <div>
                <Header />
                <div className='container'>
                    <div className='row'>
                        {displayListClass(listClassroom)}
                    </div>
                </div>
                <CreateClass addClass={handleAddNewClass} />
                <JoinClass joinClass={handleJoinClass} />
            </div>
        )

    }
    else {
        return <Navigate to='/' />
    }

}

export default ClassRoom;