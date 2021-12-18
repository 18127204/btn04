import React from 'react';
import { INFO, TOKEN, INFCLASS, URL_API, URL_FRONTEND } from '../../SettingValue';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import HeaderClassRoom from '../HeaderClassRoom';
import InvitateTeacher from '../Invitation/InvitateTeacher';
import InvitateStudent from '../Invitation/InvitateStudent';

const ShowDetailClass = () => {
    const { link } = useParams();
    const [infoClass, setInfoClass] = useState([]);
    const [infoGradeStructure, setInfoGradeStructure] = useState([]);
    const [role, setRole] = useState('');
    const [lstTeachers, setLstTeachers] = useState([]);
    const [lstStudents, setLstStudents] = useState([]);
    //Run 1st
    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            getDetailClassroom();
            getInfoGradeStructure();
            getRoleInClass();
            getAllListTeachers();
            getAllListStudents();
        }
    }, []);

    const getDetailClassroom = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/classroom/api/ShowDetailClass/${link}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setInfoClass(res.data[0]);
            localStorage.setItem(INFCLASS, JSON.stringify(res.data[0]));
            // this.getAllListAssignmentInClasses();
            // this.getNameAssignment();
            // this.getStudentWithPointAssignment();
        });
        promise.catch((error) => {
            console.log('getDetailClassroom failed', error);
        });
    }

    const getInfoGradeStructure = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/assignment/api/ShowGradeStructure/${link}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setInfoGradeStructure(res.data);
        });
        promise.catch((error) => {
            console.log('getInfoGradeStructure failed', error);
        });
    }

    const getRoleInClass = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/idenRole/api/IdentifyRole/${link}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setRole(res.data[0].role);
            // console.log('getRoleInClass', res.data[0].role);
        });
        promise.catch((error) => {
            console.log('getRoleInClass failed', error);
        });
    }

    const getAllListTeachers = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/classroom/api/ShowListTeachers/${link}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setLstTeachers(res.data);
        });
        promise.catch((error) => {
            console.log('getAllListTeachers failed', error);
        });
    }

    const getAllListStudents = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/classroom/api/ShowListStudents/${link}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setLstStudents(res.data);
        });
        promise.catch((error) => {
            console.log('getAllListStudents failed', error);
        });
    }

    /////
    const displayInfoGradeStructure = (lst) => {
        if (lst.length) {
            return lst.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.grade} (đ)</td>
                    </tr>
                )
            })
        }
        else {
            return (
                <tr>
                    <td>Not found</td>
                    <td>Not found</td>
                </tr>
            );
        }

    }


    const displayTeacherStudent = (lst) => {
        if (lst.length) {
            return lst.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.name}</td>
                    </tr>
                )
            });
        }
        else {
            return (<tr><td></td></tr>);
        }
    }

    
    const handleInvitedTeacher = (info) => {
        let link=URL_FRONTEND + '/classroom/' + infoClass.link;
        let dataSend = { ...info, link };
        let promise = Axios({
            method: 'POST',
            url: `${URL_API}/sendEmail/SendEmailTeacher`,
            data: dataSend,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            console.log('handleInvitedTeacher',res);
            if(!res.data.status){
                alert(res.data.message);
            }
            else{
                getAllListTeachers();
            }
        });
        promise.catch((error) => {
            console.log('handleInvitedTeacher', error);
        });
    }

    const handleInvitedStudent = (info) => {
        let link=URL_FRONTEND + '/classroom/' + infoClass.link;
        let dataSend = { ...info, link };
        let promise = Axios({
            method: 'POST',
            url: `${URL_API}/sendEmail/SendEmailStudent`,
            data: dataSend,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            console.log('handleInvitedStudent',res);
            if(!res.data.status){
                alert(res.data.message);
            }
            else{
                getAllListStudents();
            }
        });
        promise.catch((error) => {
            console.log('handleInvitedStudent', error);
        });
    }


    return (
        <div>
            <HeaderClassRoom />

            {/* Tab panes */}
            <div className="tab-content">
                <div id="Newsfeed" className="container tab-pane active container">
                    <div className='row'>

                        <div className='col-md-12'>
                            <h3>Class name : {infoClass.name}</h3>
                            <h3>Content: {infoClass.description}</h3>
                            <h3>Room:{infoClass.room}</h3>
                            <h3>Link: {URL_FRONTEND + '/classroom/' + infoClass.link}</h3>
                        </div>

                        <div className='col-md-12'>
                            <h1 className='text-center'>Grade Structure</h1>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Point</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayInfoGradeStructure(infoGradeStructure)}
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>

                <div id="Assignment" className="container tab-pane fade container">

                </div>

                <div id="People" className="container tab-pane fade container">
                    <div className='row'>
                        <div className='col-md-12'>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Teachers</th>
                                        {(role === 'teacher') ? (<th><button className='btn btn-success' data-toggle="modal" data-target="#modelIdAddTeacher">Invite teacher</button></th>) : (<th></th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayTeacherStudent(lstTeachers)}
                                </tbody>
                            </table>

                        </div>
                        <div className='col-md-12'>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Students</th>
                                        {(role === 'teacher') ? (<th><button className='btn btn-success' data-toggle="modal" data-target="#modelIdAddStudent">Invite student</button></th>) : (<th></th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayTeacherStudent(lstStudents)}
                                </tbody>
                            </table>


                        </div>
                    </div>
                </div>

                <div id="sodiem" className="container tab-pane fade container">

                </div>
            </div>
            <InvitateTeacher invitedTeacher={handleInvitedTeacher} />
            <InvitateStudent invitedStudent={handleInvitedStudent} />
        </div>
    )
}
export default ShowDetailClass;