import React from 'react';
import { INFO, TOKEN, INFCLASS, URL_API, URL_FRONTEND } from '../../SettingValue';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Axios from 'axios';
import HeaderClassRoom from '../HeaderClassRoom';
import InvitateTeacher from '../Invitation/InvitateTeacher';
import InvitateStudent from '../Invitation/InvitateStudent';
import ExportStudent from '../ExportStudent';
import TabPeople from '../TabPeople';
import TabDetail from '../TabDetail';

const ShowDetailClass = () => {
    const { link } = useParams();
    const [infoClass, setInfoClass] = useState([]);
    const [infoGradeStructure, setInfoGradeStructure] = useState([]);
    const [role, setRole] = useState('');
    const [lstTeachers, setLstTeachers] = useState([]);
    const [lstStudents, setLstStudents] = useState([]);
    const [lstAsments, setLstAsments] = useState([]);
    const fileNameStudentList = "StudentList"; // here enter filename for your excel file
    //Run 1st
    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            getDetailClassroom();
            getInfoGradeStructure();
            getRoleInClass();
            getAllListTeachers();
            getAllListStudents();
            getAllListAssignments();
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

    const getAllListAssignments = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/assignment/api/GetALLListAssignment/${link}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setLstAsments(res.data);
        });
        promise.catch((error) => {
            console.log('getAllListAssignments failed', error);
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
            console.log('displayStudent', lst);
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
        let link = URL_FRONTEND + '/classroom/' + infoClass.link;
        let dataSend = { ...info, link };
        let promise = Axios({
            method: 'POST',
            url: `${URL_API}/sendEmail/SendEmailTeacher`,
            data: dataSend,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            console.log('handleInvitedTeacher', res);
            if (!res.data.status) {
                alert(res.data.message);
            }
            else {
                getAllListTeachers();
            }
        });
        promise.catch((error) => {
            console.log('handleInvitedTeacher', error);
        });
    }

    const handleInvitedStudent = (info) => {
        let link = URL_FRONTEND + '/classroom/' + infoClass.link;
        let dataSend = { ...info, link };
        let promise = Axios({
            method: 'POST',
            url: `${URL_API}/sendEmail/SendEmailStudent`,
            data: dataSend,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            console.log('handleInvitedStudent', res);
            if (!res.data.status) {
                alert(res.data.message);
            }
            else {
                getAllListStudents();
            }
        });
        promise.catch((error) => {
            console.log('handleInvitedStudent', error);
        });
    }

    //f1
    const handleDisplayAssignment = (lst) => {
        if (lst.length) {
            return lst.map((bt, index) => {
                return (
                    <Draggable key={index} draggableId={index + ''} index={index}>
                        {(provided) => 
                        (<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <p>{index + 1}</p>
                            <p>{bt.name}</p>
                            <p>{bt.description}</p>
                            <button className='btn btn-primary '>Chỉnh sửa</button>
                            <button className='btn btn-danger'>Xóa</button>
                            {/*<td>
                                 <button className='btn btn-primary mr-auto' onClick={() => this.handleGetInfoAssigment(bt.viTri, bt)} data-toggle="modal" data-target="#modelIdEditAssignment">Chỉnh sửa</button>
                                <button className='btn btn-danger' onClick={() => this.handleRemoveAssigment(bt)}>Xóa</button> 
                            </td>*/}
                        </div>)
                        }
                    </Draggable>
                )
            });
        }
        else {
            return (
                <div className="card">
                    <div className="card-header">
                        Featured
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>

            );
        }

    }

    /////
    const onDragEnd = (result) => {
        const { destination, source, reason } = result;
        if (!destination || reason === 'CANCEL') {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        const lstAssignments = Object.assign([], lstAsments);
        const droppedUser = lstAsments[source.index];
        lstAssignments.splice(source.index, 1);
        lstAssignments.splice(destination.index, 0, droppedUser);
        setLstAsments(lstAssignments);
    }

    return (
        <div>
            <HeaderClassRoom />

            {/* Tab panes */}
            <div className="tab-content">

                <TabDetail infoClass={infoClass} infoGradeStructure={infoGradeStructure}
                    displayInfoGradeStructure={displayInfoGradeStructure} />

                <div id="Assignment" className="container tab-pane fade container">
                    <div className='row'>
                        {/* <button className='btn btn-success' style={{ width: '130px', marginLeft: 'auto' }} data-toggle="modal" data-target="#modelIdAddAssignment">Thêm bài tập</button> */}
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId='dp1'>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        {handleDisplayAssignment(lstAsments)}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>

                <TabPeople role={role} lstStudents={lstStudents} lstTeachers={lstTeachers}
                    fileNameStudentList={fileNameStudentList} displayTeacherStudent={displayTeacherStudent} />

                <div id="Grade" className="container tab-pane fade container">
                    this is point
                </div>

            </div>
            <InvitateTeacher invitedTeacher={handleInvitedTeacher} />
            <InvitateStudent invitedStudent={handleInvitedStudent} />
        </div>
    )
}
export default ShowDetailClass;