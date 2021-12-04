import React, { Component } from 'react'

export default class Assignment extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        return (
            <div id="baitaptrenlop" className="container tab-pane fade container">
                <div className='container'>
                    <div className='row'>
                        <button className='btn btn-success' style={{ width: '130px', marginLeft: 'auto' }}>Thêm bài tập</button>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Số thứ tự</th>
                                    <th>Tên bài tập</th>
                                    <th>Điểm số</th>
                                    <th>Tùy chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>BTCN01</td>
                                    <td>10</td>
                                    <td>
                                        <button className='btn btn-primary mr-auto'>Chỉnh sửa</button>
                                        <button className='btn btn-danger'>Xóa</button>
                                        <button className='btn btn-warning text-white'>Thay đổi vị trí</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>BTCN02</td>
                                    <td>10</td>
                                    <td>
                                        <button className='btn btn-primary'>Chỉnh sửa</button>
                                        <button className='btn btn-danger'>Xóa</button>
                                        <button className='btn btn-warning text-white'>Thay đổi vị trí</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        )
    }
}
