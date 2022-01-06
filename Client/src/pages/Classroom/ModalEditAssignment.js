import React, { Component } from 'react'

export default class ModalEditAssignment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valuesForm: {
                //tenBaiTap:'',
                //soDiem:''
                nameassignment:'',
                diemBaiTap:''
            }
        }
    }

    handleChange = (e) => {
        
        let { name, value } = e.target;
        this.setState({
            valuesForm: { ...this.state.valuesForm, [name]: value }
        })
    }



    handleSubmit = (e) => {
        e.preventDefault();
        // console.log('haha',this.state.valuesForm);
        this.props.editAssigment(this.state.valuesForm);

    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            valuesForm:{
                // tenBaiTap:nextProps.infoAssignment.tenBaiTap,
                // soDiem:nextProps.infoAssignment.soDiem,
                tenBaiTap:nextProps.infoAssignment.nameassignment,
                soDiem:nextProps.infoAssignment.diemBaiTap,
            }

        })
    }
    render() {
        return (
            <div>
                <div className="modal fade" id="modelIdEditAssignment" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Cập nhập bài tập:</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <form>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <p>Tên bài tập</p>
                                        <input type="text" className="form-control" name="nameassignment" onChange={this.handleChange} value={this.state.valuesForm.nameassignment}/>
                                    </div>
                                    <div className="form-group">
                                        <p>Số điểm</p>
                                        <input type="text" className="form-control" name="diemBaiTap" onChange={this.handleChange} value={this.state.valuesForm.diemBaiTap} />    
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Tạo</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
