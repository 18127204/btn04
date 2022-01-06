import React, { Component } from 'react'

export default class ModalAddAssignment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valuesForm: {
                //tenBaiTap:'',
                //soDiem:'',
                nameassignment:'',
                diemBaiTap:'',
                deadline:''
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
        this.props.addNewAssignment(this.state.valuesForm);
    }

    render() {
        return (
            <div>
                <div className="modal fade" id="modelIdAddAssignment" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Thêm bài tập</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <form>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <p>Tên bài tập</p>
                                        <input type="text" className="form-control" name="nameassignment" onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <p>Số điểm</p>
                                        <input type="text" className="form-control" name="diemBaiTap" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <p>Deadline</p>
                                        <input type="text" className="form-control" name="deadline" onChange={this.handleChange} />
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
