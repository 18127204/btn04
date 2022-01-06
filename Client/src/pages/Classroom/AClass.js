import React from 'react'

export default function AClass(props) {
   // let {tenlophoc,phan,chude,phong,duonglink} = props.cl;
   let {nameclass,room,duonglink} = props.cl;
    return (

         <div className="card" style={{ width: '18rem' }}>
         {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
         <div className="card-body">
             <h5 className="card-title">Tên lớp: {nameclass}</h5>
             <p className="card-text">Phòng: {room}</p>
             <a href={duonglink} className="btn btn-primary">Tham gia</a>
         </div>
     </div>
    )
}
