import React from 'react'

export default function AClass(props) {
   // let {tenlophoc,phan,chude,phong,duonglink} = props.cl;
   let {nameclass,room,duonglink} = props.cl;
    return (

         <div className="card" style={{ width: '18rem' }}>
         {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
         <div className="card-body">
             <h5 className="card-title">Name: {nameclass}</h5>
             <p className="card-text">Room: {room}</p>
             <a href={duonglink} className="btn btn-primary">Join</a>
         </div>
     </div>
    )
}
