import React, {useState } from 'react'
const CreateAssignment = ({addass}) => {
    const [createAss, setCreateAsss] = useState(
        {
            name: '',
            description: '',
            grade:''
        }
    )
    const handleChange = (e) => {
        const { name, value } = e.target; 
        setCreateAsss({ ...createAss, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addass(createAss);

        // promise.then((result) => {
            
        //     console.log('kq tra ve sau login',result);
        //     localStorage.setItem(INFO, JSON.stringify(result.data.content));
        //     localStorage.setItem(TOKEN, result.data.tokenAccess);
        //     navigate("/classroom");
        // })
        // promise.catch((err) => {
        //     alert('Login again');
        //     console.log('Error login: ', err);
        // });
    }
    return (
        <div>
            <div class="modal fade" id="modelAddAssignment" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add assigment</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" class="form-control" name="name" onChange={handleChange}/>
                            </div>
                            <div class="form-group">
                                <label for="description">Description</label>
                                <input type="text" class="form-control" name="description" onChange={handleChange}/>
                            </div>
                            <div class="form-group">
                                <label for="grade">Grade</label>
                                <input type="text" class="form-control" name="grade" onChange={handleChange}/>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" onClick={handleSubmit}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAssignment;
