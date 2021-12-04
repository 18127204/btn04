import React, { Component } from 'react'
import HeaderClassRoom from '../../components/HeaderClassRoom/HeaderClassRoom';
import { Redirect } from 'react-router';
import { URL_API, URL_FRONTEND, INFO, TOKEN, INFCLASS } from '../../SettingValue';
import Axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ModalAddStudent from './ModalAddStudent';
import ModalAddTeacher from './ModalAddTeacher';
import ModalAddAssignment from './ModalAddAssignment';
import ModalEditAssignment from './ModalEditAssignment';
import * as XLSX from 'xlsx';
export default class DetailEachClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoClass: [],
            lstStudents: [],
            lstTeachers: [],
            lstAssignments: [],
            indexAssignment: '',
            infoAssignment: '',
            nameAssignment: [],
            studentWithPointAssignment: [],
            dataExcelStudentList: [],
            dataExcelPoint:[],
        }
    }
    //f1
    getDetailClassroom = () => {

        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/classroom/api/detailClassroom/${this.props.match.params.duonglink}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            // console.log('infor class',res.data);
            this.setState({
                infoClass: res.data[0]
            });
            localStorage.setItem(INFCLASS, JSON.stringify(res.data[0]));
            this.getAllListAssignmentInClasses();
            this.getNameAssignment();
            this.getStudentWithPointAssignment();
            // console.log('get infor class oke',this.state.infoClass);
        });
        promise.catch((error) => {
            console.log('get infor class that bai', error);
        });
    }
    //f1
    getAllListTeachers = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/classroom/api/teacherClassroom/${this.props.match.params.duonglink}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            // console.log('infor teacher',res.data);
            this.setState({
                lstTeachers: res.data
            })
            // console.log('get infor teacher oke',this.state.lstTeachers);
        });
        promise.catch((error) => {
            console.log('get infor teacher that bai', error);
        });
    }
    //f1
    getAllListStudents = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/classroom/api/studentClassroom/${this.props.match.params.duonglink}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            console.log('infor student', res.data);
            this.setState({
                lstStudents: res.data
            })
            // console.log('get infor student oke', this.state.lstStudents);
        });
        promise.catch((error) => {
            console.log('get infor student that bai', error);
        });
    }
    //f1
    componentDidMount() {
        if (localStorage.getItem(TOKEN)) {
            this.getDetailClassroom();
            this.getAllListTeachers();
            this.getAllListStudents();
        }

    }
    //f1
    handleDisplayTeachers = (lst) => {
        if (lst.length) {
            return lst.map((teacher, index) => {
                return (
                    <tr key={index}>
                        <td>{teacher.hoten}</td>
                    </tr>
                )
            })
        }
        else {

        }

    }
    //f1
    handleDisplayStudents = (lst) => {
        if (lst.length) {
            return lst.map((st, index) => {
                return (
                    <tr key={index}>
                        <td>{st.hoten}</td>
                    </tr>
                )
            })
        }
        else {
            return (<div></div>)
        }

    }

    //f1
    handleInvitedTeacher = (info) => {
        let infoCourse = JSON.parse(localStorage.getItem(INFCLASS));
        let dataSend = { ...info, ...infoCourse };

        let promise = Axios({
            method: 'POST',
            url: `${URL_API}/sendEmail/SendEmailTeacher`,
            data: dataSend,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            // console.log('oke p1');
            this.getAllListTeachers();
        });
        promise.catch((error) => {
            console.log('get infor student that bai', error);
        });

    }

    //f1
    handleInvitedStudent = (info) => {
        let infoCourse = JSON.parse(localStorage.getItem(INFCLASS));
        let dataSend = { ...info, ...infoCourse };
        let promise = Axios({
            method: 'POST',
            url: `${URL_API}/sendEmail/SendEmailStudent`,
            data: dataSend,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            // console.log('oke p1');
            this.getAllListStudents();
        });
        promise.catch((error) => {
            console.log('get infor student that bai', error);
        });
    }

    //f1
    getAllListAssignmentInClasses = () => {
        let infoCourse = JSON.parse(localStorage.getItem(INFCLASS));
        let idLop = infoCourse.id;
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/assignment/api/GetALLListAssignment/${idLop}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            console.log('get all list assignment oke', res.data);
            this.setState({
                lstAssignments: res.data
            })
        });
        promise.catch((error) => {
            console.log('get infor teacher that bai', error);
        });
    }


    //f1
    handleAddNewAssignment = (bt) => {
        let infoCourse = JSON.parse(localStorage.getItem(INFCLASS));
        let idLop = infoCourse.id;
        let dataSend = { ...bt, idLop: idLop, viTri: this.state.lstAssignments.length - 1 };

        let promise = Axios({
            method: 'POST',
            url: `${URL_API}/assignment/api/AddNewAssignment`,
            data: dataSend,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            console.log('add new assignment');
            this.getAllListAssignmentInClasses();
        });
        promise.catch((error) => {
            console.log('add new assignment that bai', error);
        });
    }

    //f1
    handleDisplayAssignment = (lst) => {
        return lst.map((bt, index) => {
            return (
                <Draggable key={index} draggableId={index + ''} index={index}>
                    {(provided) => (<tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <td>{index + 1}</td>
                        <td>{bt.nameassignment}</td>
                        <td>{bt.diemBaiTap}</td>
                        <td>{bt.deadline}</td>
                        <td>
                            <button className='btn btn-primary mr-auto' onClick={() => this.handleGetInfoAssigment(bt.viTri, bt)} data-toggle="modal" data-target="#modelIdEditAssignment">Chỉnh sửa</button>
                            <button className='btn btn-danger' onClick={() => this.handleRemoveAssigment(bt)}>Xóa</button>
                        </td>
                    </tr>)}
                </Draggable>
            )
        });
    }

    //f1
    handleGetInfoAssigment = (viTri, bt) => {
        this.setState({
            indexAssignment: viTri,
            infoAssignment: bt,
        }, () => {
            console.log('indexAssignment: ' + this.state.indexAssignment);
            console.log('infoAssignment: ', this.state.infoAssignment);
        });
    }

    //f1
    handleRemoveAssigment = (bt) => {
        let promise = Axios({
            url: `${URL_API}/assignment/api/deleteAssignment/${bt.id}`,
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then(() => {
            console.log('remove assignment success');
            this.getAllListAssignmentInClasses();
        });
        promise.catch((error) => {
            console.log('remove assignment that bai', error);
        });
    }

    //f1
    handleEditAssigment = (bt) => {
        let infoCourse = JSON.parse(localStorage.getItem(INFCLASS));
        let idLop = infoCourse.id;
        let dataSend = { ...bt, idLop: idLop };

        console.log('data send', dataSend);
        let promise = Axios({
            url: `${URL_API}/assignment/api/editAssignment/${this.state.infoAssignment.id}`,
            method: 'PUT',
            data: dataSend,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            console.log('Edit assignment success');
            this.getAllListAssignmentInClasses();
        });
        promise.catch((error) => {
            console.log('Edit assignment that bai', error);
        });
    }

    //f1
    getNameAssignment = () => {
        let infoCourse = JSON.parse(localStorage.getItem(INFCLASS));
        let idLop = infoCourse.id;
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/point/api/getNameAssignment/${idLop}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            console.log('get name assignment oke', res.data);
            this.setState({
                nameAssignment: res.data
            })
        });
        promise.catch((error) => {
            console.log('get name assignment that bai', error);
        });
    }

    //f1
    getStudentWithPointAssignment = () => {
        let infoCourse = JSON.parse(localStorage.getItem(INFCLASS));
        let idLop = infoCourse.id;
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/point/api/getStudentWithPointAssignment/${idLop}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            console.log(' getStudentWithPointAssignment oke', res.data);
            this.setState({
                studentWithPointAssignment: res.data
            })
        });
        promise.catch((error) => {
            console.log('getStudentWithPointAssignment that bai', error);
        });
    }

    //f1
    displayNameAssignment = (lst) => {
        return lst.map((item, index) => {
            return (
                <th key={index}>{item.nameassignment}</th>
            );
        });
    }

    //f1
    displayStudentWithPointAssignment = (lst) => {

        let arrayPoint = lst.map((item, index) => {
            let temp = Object.values(item);
            let result = temp.filter(i => i !== temp[temp.length - 1]);
            result.unshift(temp[temp.length - 1]);
            return result;
        });

        let res = [];
        for (const element of arrayPoint) {
            let x = element.map((item, index) => {
                // return (<td key={index}> <input value={item}/> </td>)
                return (<td key={index}> <input value={element}/> </td>)
            });
            res.push(
                <tr>
                    {x}
                </tr>
            );
        }
        return res;
    }

    //f1
    handleReadExcelFile = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: 'buffer' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);
                resolve(data);
            };
            fileReader.onerror = (error) => {
                reject(error)
            };
        });

        promise.then((d) => {
            let infoCourse = JSON.parse(localStorage.getItem(INFCLASS));
            let idclass = infoCourse.id;
            let tempDataExcelStudentList = [...d];

            for (let i = 0; i < tempDataExcelStudentList.length; i++) {
                tempDataExcelStudentList[i] = { ...tempDataExcelStudentList[i], idclass }
            }
            this.setState({
                dataExcelStudentList: tempDataExcelStudentList
            }, () => {
                console.log('dataExcelStudentList: ', this.state.dataExcelStudentList);
                //let dataSend = JSON.stringify({ "listStudent": this.state.dataExcelStudentList });
                let dataSend = JSON.stringify(this.state.dataExcelStudentList);
                console.log('dataSend: ', dataSend);

                let promiseAPI = Axios({
                    method: 'POST',
                    url: `${URL_API}/importExcel/api/uploadStudentList`,
                    data: {datasend:dataSend},
                   // headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
                });
                promiseAPI.then((res) => {
                    console.log(' handleReadExcelFile oke', res.data);
                });
                promiseAPI.catch((error) => {
                    console.log('handleReadExcelFile that bai', error);
                });

                console.log('dataSend1: ');
            })

        })
    };

    //f1
    handleUploadPoint = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: 'buffer' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);
                resolve(data);
            };
            fileReader.onerror = (error) => {
                reject(error)
            };
        });

        promise.then((d) => {
            let tempDataExcelPoint = [...d];

            this.setState({
                dataExcelPoint: tempDataExcelPoint
            }, () => {
                console.log('dataExcelPoint: ', this.state.dataExcelPoint);
                //let dataSend = JSON.stringify({ "listStudent": this.state.dataExcelStudentList });
                let dataSend = JSON.stringify(this.state.dataExcelPoint);
                console.log('dataSend: ', dataSend);

                let promiseAPI = Axios({
                    method: 'POST',
                    url: `${URL_API}/importExcel/api/uploadPoint`,
                    data: {datasend:dataSend},
                   // headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
                });
                promiseAPI.then((res) => {
                    console.log(' handleUploadPoint oke', res.data);
                });
                promiseAPI.catch((error) => {
                    console.log('handleUploadPoint that bai', error);
                });

                console.log('dataSend2: ');
            })

        })
    };

    //f1
    onDragEnd = (result) => {
        const { destination, source, reason } = result;
        if (!destination || reason === 'CANCEL') {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        const lstAssignments = Object.assign([], this.state.lstAssignments);
        const droppedUser = this.state.lstAssignments[source.index];
        lstAssignments.splice(source.index, 1);
        lstAssignments.splice(destination.index, 0, droppedUser);
        this.setState({
            lstAssignments
        })
    }


    render() {
        if (localStorage.getItem(TOKEN)) {
            return (
                <div>
                    <HeaderClassRoom tenLop={this.state.infoClass.tenlophoc} />
                    {/* Tab panes */}
                    <div className="tab-content">
                        <div id="bangtin" className="container tab-pane active container">
                            <div className='row'>
                                <div className='col-md-12'>
                                    {/* <h3>Tên lớp học: {this.state.infoClass.tenlophoc}</h3>
                                    <h3>Chủ đề : {this.state.infoClass.chude}</h3>
                                    <h3>Phần : {this.state.infoClass.phan}</h3>
                                    <h3>Chủ phòng :{this.state.infoClass.phong}</h3>
                                    <h3>Đường link tham gia:  {URL_FRONTEND + this.state.infoClass.duonglink}</h3> */}

                                    <h3>Tên lớp học: {this.state.infoClass.nameclass}</h3>
                                    <h3>Chủ phòng :{this.state.infoClass.room}</h3>
                                    <h3>Đường link tham gia:  {URL_FRONTEND + this.state.infoClass.duonglink}</h3>
                                </div>

                            </div>

                        </div>

                        <div id="moinguoi" className="container tab-pane fade container">
                            <div className='row'>
                                <div className='col-md-12'>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Giáo viên</th>
                                                <th><button className='btn btn-success' data-toggle="modal" data-target="#modelIdAddTeacher">Mời giáo viên</button></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.handleDisplayTeachers(this.state.lstTeachers)}
                                        </tbody>
                                    </table>
                                </div>
                                <div className='col-md-12'>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Học sinh</th>
                                                <th><button className='btn btn-success' data-toggle="modal" data-target="#modelIdAddStudent">Mời học sinh</button></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.handleDisplayStudents(this.state.lstStudents)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>


                        <div id="baitaptrenlop" className="container tab-pane fade container">
                            <div className='container'>
                                <div className='row'>
                                    <button className='btn btn-success' style={{ width: '130px', marginLeft: 'auto' }} data-toggle="modal" data-target="#modelIdAddAssignment">Thêm bài tập</button>
                                    <table className="table mt-3">
                                        <thead>
                                            <tr>
                                                <th>Số thứ tự</th>
                                                <th>Tên bài tập</th>
                                                <th>Điểm số</th>
                                                <th>Deadline</th>
                                                <th>Tùy chọn</th>
                                            </tr>
                                        </thead>
                                        <DragDropContext onDragEnd={this.onDragEnd}>
                                            <Droppable droppableId='dp1'>
                                                {(provided) => (
                                                    <tbody ref={provided.innerRef} {...provided.droppableProps}>
                                                        {this.handleDisplayAssignment(this.state.lstAssignments)}
                                                        {provided.placeholder}
                                                    </tbody>
                                                )}
                                            </Droppable>
                                        </DragDropContext>
                                    </table>

                                </div>
                            </div>
                        </div>

                        <div id="sodiem" className="container tab-pane fade container">
                            <a href={`${URL_API}/fileExcel/StudentListTemplate`}>Mẫu danh sách học sinh</a>
                            <a href={`${URL_API}/fileExcel/assignmentTemplate`}>Mẫu bài tập</a>
                            <div>
                                <p>upload file student</p>
                                <input type='file' onChange={(e) => {
                                    const file = e.target.files[0];
                                    this.handleReadExcelFile(file);
                                }} />
                            </div>

                            <div>
                                <p>upload file point</p>
                                <input type='file' onChange={(e) => {
                                    const file = e.target.files[0];
                                    this.handleUploadPoint(file);
                                }} />
                            </div>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Họ và tên</th>
                                        <th>Tổng điểm</th>
                                        {this.displayNameAssignment(this.state.nameAssignment)}
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.displayStudentWithPointAssignment(this.state.studentWithPointAssignment)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <ModalAddTeacher invitedTeacher={this.handleInvitedTeacher} />
                    <ModalAddStudent invitedStudent={this.handleInvitedStudent} />
                    <ModalAddAssignment addNewAssignment={this.handleAddNewAssignment} />
                    <ModalEditAssignment infoAssignment={this.state.infoAssignment} editAssigment={this.handleEditAssigment} />

                </div>

            )
        }
        else {
            return <Redirect to='/' />
        }

    }
}
