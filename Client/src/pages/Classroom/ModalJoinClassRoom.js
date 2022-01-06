import React, { Component } from 'react'

export default class ModalJoinClassRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valuesForm: {
                duonglink:'',
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
        this.props.joinClass(this.state.valuesForm.duonglink);
    }
    render() {
        return (
            <div>
                <div className="modal fade" id="modelIdJoin" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Tham gia lớp học</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <form>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <p>Nhập đường link</p>
                                        <input type="text" className="form-control" name="duonglink" onChange={this.handleChange} required />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Tham gia</button>
                                </div>

                            </form>



                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

