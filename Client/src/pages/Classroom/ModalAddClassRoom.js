import React, { Component } from 'react'

export default class ModalAddClassRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valuesForm: {
              //  tenlophoc:'',
               // phan:'',
               // chude:'',
               // phong:'',
               nameclass:'',
               room:''
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
        this.props.addClass(this.state.valuesForm);
    }
    render() {
        return (
            <div>
                <div className="modal fade" id="modelId" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Tạo lớp học</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <form>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <p>Tên lớp học (*)</p>
                                        <input type="text" className="form-control" name="nameclass" onChange={this.handleChange} required />
                                    </div>
                                    {/* <div className="form-group">
                                        <p>Phần</p>
                                        <input type="text" className="form-control" name="phan" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <p>Chủ đề</p>
                                        <input type="text" className="form-control" name="chude" onChange={this.handleChange}/>
                                    </div> */}
                                    <div className="form-group">
                                        <p>Phòng</p>
                                        <input type="text" className="form-control" name="room" onChange={this.handleChange}/>
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

