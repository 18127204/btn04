import React, { Component } from 'react'
import {URL_API,INFO,TOKEN} from '../../SettingValue';
import Header from '../../Component/Header/Header';
import AClass from './AClass';
import Axios from 'axios';
import ModalAddClassRoom from './ModalAddClassRoom';
import ModalJoinClassRoom from './ModalJoinClassRoom';
import { Navigate } from 'react-router-dom';



export default class ClassRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClassRoom:[]
        }
    }

    getAllClassRoom=()=>{
        let promise=Axios({
            url:`${URL_API}/classroom/api/GetALLListClassroom/${JSON.parse(localStorage.getItem(INFO)).id}`,
            method:'GET',
            headers:{'Authorization':'Bearer '+localStorage.getItem(TOKEN) }
        });
        promise.then((result)=>{
            this.setState({
                listClassRoom:result.data
            })
            console.log('get all class: ',this.state.listClassRoom);
        });
        promise.catch((er)=>{
            console.log("loi o classroom",er);
        })
    }


    handleAddNewClass=(cl)=>{
        let tempClass=[...this.state.listClassRoom];
        let id_nguoithamgia=JSON.parse(localStorage.getItem(INFO)).id;
        let dLink=new Date();
        let duonglink= '/classroom/'+dLink.getTime();
       // let dataSend={...cl,id_nguoithamgia,duonglink,id_chuphong:id_nguoithamgia};
       let dataSend={...cl,id_nguoithamgia,duonglink};
        tempClass.push(dataSend);
        let promise=Axios({
            method:'POST',
            url:`${URL_API}/classroom/api/AddNewClassroom`,
            data:dataSend,
            headers:{'Authorization':'Bearer '+localStorage.getItem(TOKEN) }
        });
        promise.then((res)=>{
            this.setState({
                listClassRoom:tempClass
            })
            console.log('tạo class oke',dataSend);
        });
        promise.catch((error)=>{
            console.log('tao class that bai',error);
        });
    }


        componentDidMount(){
            if(localStorage.getItem(TOKEN)){
                this.getAllClassRoom(); 
            }

        }
    


    displayListClass = (lst) => {
        console.log('chieu dai: ',lst.length);
        if(lst.length){
            return lst.map((cl, index) => {
                return (
                    <div className="col-md-3" key={index}>
                        <AClass cl={cl}/>
                    </div>
                );
            })
        }
        else{
            return(<div></div>)     
        }
    }

    //hmm
    handleJoinClass=(inputLink)=>{
        let tempClass=[...this.state.listClassRoom];
        let id_nguoithamgia=JSON.parse(localStorage.getItem(INFO)).id;

        let words=inputLink.split('/');
        let resultFind=words[words.length-1];

        let promise=Axios({
            method:'GET',
            url:`${URL_API}/classroom/api/joinClassroom/${resultFind}`,
            headers:{'Authorization':'Bearer '+localStorage.getItem(TOKEN) }
        });
        promise.then((result)=>{
            console.log('Vào lớp oke',result.data);
            tempClass.push(result.data[0]);
            this.setState({
                listClassRoom:tempClass
            });

            let promise1=Axios({
                method:'POST',
                url:`${URL_API}/classroom/api/AddPeopleClassroom`,
                data:{id_nguoithamgia:id_nguoithamgia,duonglink:resultFind},
                headers:{'Authorization':'Bearer '+localStorage.getItem(TOKEN) }
            });
            promise1.then((res)=>{
                console.log('add people to class thanh cong');
            });
            promise1.catch((error)=>{
                console.log('add people to class that bai',error);
            })

        });
        promise.catch((error)=>{
            console.log('tao class that bai',error);
        });

    }
    render(){
        if(localStorage.getItem(TOKEN)){
            return (
                <div>
                    <Header/>
                    <div className='container'>
                        <div className='row'>
                            {this.displayListClass(this.state.listClassRoom)}
                        </div>
                    </div>
                    <ModalAddClassRoom addClass={this.handleAddNewClass}/>
                    <ModalJoinClassRoom joinClass={this.handleJoinClass}/>
                </div>
            )
            
        }
        else{
            return <Navigate to='/'/>
        }
    }
}
