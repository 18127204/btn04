import React, { Component, useState } from 'react'

const AddClass = ({addClass}) => {
    const [valuesForm, setValuesForm] = useState(
        {
            nameClass: '',
            room: ''
        }
    )
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValuesForm({ ...valuesForm, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addClass(setValuesForm);
    }
    return (
        <div>
            <div className="modal fade" id="modelId" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Create class</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="form-group">
                                    <p>Name (*)</p>
                                    <input type="text" className="form-control" name="nameclass" onChange={handleChange} required />
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
                                    <p>Room</p>
                                    <input type="text" className="form-control" name="room" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Create</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddClass