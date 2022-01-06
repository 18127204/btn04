import React, { Component } from 'react'

export default class ModalAddTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valuesForm: {
                emailNguoiGui:'',
                passEmail:'',
                emailNguoiNhan:'',
                duongLinkFull:'',
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
        this.props.invitedTeacher(this.state.valuesForm);
    }

    render() {
        return (
            <div>
                <div className="modal fade" id="modelIdAddTeacher" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Mời giáo viên</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <form>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <p>Nhập email của bạn</p>
                                        <input type="email" className="form-control" name="emailNguoiGui" onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <p>Nhập mật khẩu email của bạn</p>
                                        <input type="password" className="form-control" name="passEmail" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <p>Nhập email người nhận</p>
                                        <input type="email" className="form-control" name="emailNguoiNhan" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <p>Nhập link lớp học</p>
                                        <input type="text" className="form-control" name="duongLinkFull" onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Gửi</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
