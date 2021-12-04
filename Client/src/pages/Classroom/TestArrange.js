import React, { Component } from 'react';
import { users } from '../data/Data';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default class TestArrange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: users
        }
    }
    onDragEnd = (result) => {
        const { destination, source, reason } = result;
        if (!destination || reason === 'CANCEL') {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        const users = Object.assign([], this.state.users);
        const droppedUser = this.state.users[source.index];
        users.splice(source.index, 1);
        users.splice(destination.index, 0, droppedUser);
        this.setState({
            users
        })
    }

    renderUsers = (lst) => {
        return lst.map((item, index) => {
            return (
                <Draggable key={index} draggableId={index + ''} index={index}>
                    {(provided) => (<tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <td>{index + 1}</td>
                            <td>{item.tenBaiTap}</td>
                            <td>{item.soDiem}</td>
                            <td>
                                <button className='btn btn-primary mr-auto'>Chỉnh sửa</button>
                                <button className='btn btn-danger'>Xóa</button>
                                <button className='btn btn-warning text-white'>Thay đổi vị trí</button>
                            </td>
                    </tr>)}
                </Draggable>
            )
        });
    }

    render() {
        return (

            <div className='container'>
                <div className='row'>
                    <button className='btn btn-success' style={{ width: '130px', marginLeft: 'auto' }} data-toggle="modal" data-target="#modelIdAddAssignment">Thêm bài tập</button>
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th>Số thứ tự</th>
                                <th>Tên bài tập</th>
                                <th>Điểm số</th>
                                <th>Tùy chọn</th>
                            </tr>
                        </thead>

                        <DragDropContext onDragEnd={this.onDragEnd}>
                                <Droppable droppableId='dp1'>
                                    {(provided) => (
                                        <tbody ref={provided.innerRef} {...provided.droppableProps}>
                                            {this.renderUsers(this.state.users)}
                                            {provided.placeholder}
                                        </tbody>
                                    )}
                                </Droppable>
                        </DragDropContext>
                    </table>
                </div>
            </div>

        )
    }
}
