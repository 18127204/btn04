import React, { Component } from 'react';
import * as XLSX from 'xlsx';
export default class TestUploadExcel extends Component {
    constructor(props) {
        super(props);
        this.state={
            dataExcel:[]
        }
    }
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
            this.setState({
                dataExcel:d
            })
            console.log(d);
        })
    };

    displayForFun=(lst)=>{
        if(lst.length>0){
            return lst.map((item,index)=>{
                return(
                    <div key={index}>{item.StudentId} --- {item.FullName}</div>
                );
            })
        }
    }    
    render() {
        return (
            <div>
                <p>upload file</p>
                <input type='file' onChange={(e) => {
                    const file = e.target.files[0];
                    this.handleReadExcelFile(file);
                }} />
                {this.displayForFun(this.state.dataExcel)}
            </div>

            

        )
    }
}
