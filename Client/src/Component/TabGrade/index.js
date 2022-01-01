import React from 'react';
import { useState, useEffect } from 'react';
import UploadStudentList from '../UploadStudentList'
import Axios from 'axios';
import { INFO, TOKEN, INFCLASS, URL_API, URL_FRONTEND } from '../../SettingValue';
import ShowInfoStudentHavingAccount from '../ShowInfoStudentHavingAccount';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ExportTotalGradeStudent from '../ExportTotalGradeStudent';
const TabGrade = ({ role, link }) => {
    const [lstRowNameAss, setLstRowNameAss] = useState([]);
    const [lstGradeStudent, setLstGradeStudent] = useState([]);
    const [infoEditPoint, setInfoEditPoint] = useState('');
    const [lstHasAccount, setLstHasAccount] = useState([]);
    const [lstGetTotalGrade, setLstGetTotalGrade] = useState([]);
    //Run 1st
    useEffect(() => {
        getListRowNameAssignment();
        getStudentHasAccount();
        getListAllGradeStudent();
    }, []);

    const getListRowNameAssignment = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/assignment/api/GetALLListAssignment/${link}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setLstRowNameAss(res.data);
        });

        promise.catch((error) => {
            console.log('getListRowNameAssignment failed', error);
        });
    }

    const getListAllGradeStudent = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/point/api/GetStudentsWithPoint/${link}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setLstGradeStudent(res.data);
        });
        promise.catch((error) => {
            console.log('getListAllGradeStudent failed', error);
        });
    }

    const getStudentHasAccount = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/point/api/GetStudentHaveAccount/${link}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setLstHasAccount(res.data);
        });
        promise.catch((error) => {
            console.log('getListAllGradeStudent failed', error);
        });
    }

    const handleUpdatePoint = (e) => {
        // e.preventDefault();
        let promise = Axios({
            method: 'PUT',
            url: `${URL_API}/point/api/UpdatePointAssigmentStudent/${link}`,
            data: { dataSend: infoEditPoint },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            console.log('handleUpdatePoint', res.data.message);
        });
        promise.catch((error) => {
            console.log('handleUpdatePoint failed', error);
        });
    }

    //
    const displayTRowNameAssignment = (lst) => {
        if (lst.length) {
            let tRow = [];
            tRow.push(<th key={0}>ID Students</th>);
            lst.map((item, index) => {
                tRow.push(<th key={index + 1}>{item.name} ({item.grade} đ)</th>);
            });
            tRow.push(<th key={lst.length + 2}>Total Grade</th>);
            return tRow;
        }
        else {
            return (<th></th>);
        }
    }

    const handleTotalGrade = (lstRowNameAss, lstAssAndGrade) => {
        let sum = 0;
        for (let i = 0; i < lstRowNameAss.length; i++) {
            sum = sum + Number(lstAssAndGrade[i].grade) * (Number(lstRowNameAss[i].grade) / 10);
        }
        return sum.toFixed(2);
    }

    const handleChangeEditGrade = (e) => {
        const { name, value } = e.target;
        setInfoEditPoint(`${name}:${value}`);
    }

    const checkHavingAccount = (mssv, lstHasAccount) => {
        let indexFind = lstHasAccount.findIndex((item) => { return item.mssv == mssv });
        if (indexFind === -1) {
            return false;
        }
        return true;
    }
    const getInfoStudent = (mssv, lstHasAccount) => {
        let indexFind = lstHasAccount.findIndex((item) => { return item.mssv == mssv });
        return lstHasAccount[indexFind];
    }
    const displayTBody = (arrayGradeStu, lstStudentHaveAcc) => {
        let result = [];
        if (arrayGradeStu.length && lstStudentHaveAcc.length) {
            for (let i = 0; i < arrayGradeStu.length; i++) {
                let temp = [];
                let tdGrade = arrayGradeStu[i].lstAssAndGrade.map((item, index) => {
                    return (
                        <td key={`tdGrade${index}`}>
                            {(role==='teacher')?
                            (<input type="text" className="form-control" name={`${arrayGradeStu[i].mssv}:${item.assignmentId}`}
                                defaultValue={item.grade} onChange={handleChangeEditGrade} onBlur={handleUpdatePoint} />):
                                (<input type="text" className="form-control" readOnly value={item.grade} />)
                            }
                            
                        </td>
                    );
                });

                temp.push(
                    <tr key={`trGrade${i}`}>
                        {checkHavingAccount(arrayGradeStu[i].mssv, lstStudentHaveAcc) ? (<td><ShowInfoStudentHavingAccount infoShow={getInfoStudent(arrayGradeStu[i].mssv, lstHasAccount)} /></td>) : (<td>{arrayGradeStu[i].fullName}</td>)}
                        {tdGrade}
                        <td>{handleTotalGrade(lstRowNameAss, arrayGradeStu[i].lstAssAndGrade)}</td>
                    </tr>
                )
                result.push(temp);
            }
        }

        return result;
    }

    return (
        <div id="Grade" className="container tab-pane fade container">

            <div className='d-flex flex-row'>
                <UploadStudentList role={role} link={link} />
                <ExportTotalGradeStudent lstRowNameAss={lstRowNameAss} lstGradeStudent={lstGradeStudent} 
                displayTRowNameAssignment={displayTRowNameAssignment} handleTotalGrade={handleTotalGrade} role={role}/>
            </div>

            <table className="table" id='emp-table1'>
                <thead>
                    <tr>
                        {displayTRowNameAssignment(lstRowNameAss)}
                    </tr>
                </thead>
                <tbody>
                    {displayTBody(lstGradeStudent, lstHasAccount)}
                </tbody>
            </table>
        </div>
    )
}

export default TabGrade;
