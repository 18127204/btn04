var express=require('express');
var router=express.Router();
var pool=require('./pool');
var passport=require('../modules/passport');

/*Get all list Assignment with check param: idLop F */
router.get('/api/GetALLListAssignment/:idLop', function(req, res, next) {
    let idLop=req.params.idLop;
    //let sql='select * from managerassignment where idLop= ?';
    let sql='select * from assignment where idclass= ?';
    pool.query(sql,[idLop],(error,result)=>{
        if(error){
            res.send(error);
        }
        else{
            // console.log('GetALLLis: ',result);
            res.json(result);
            
        }   
    });
});

/*Create Assignment F*/  
router.post('/api/AddNewAssignment', function(req, res, next) {
    //let {tenBaiTap,soDiem,idLop,viTri}=req.body;
    let {nameassignment,diemBaiTap,idLop,viTri,deadline}=req.body;
    //let sqlNewAssignment="insert into managerassignment (tenBaiTap,soDiem,idLop,viTri) values(?,?,?,?)";
    let sqlNewAssignment="insert into assignment (nameassignment,idclass,deadline,diemBaiTap) values(?,?,?,?)";
    pool.query(sqlNewAssignment,[nameassignment,idLop,deadline,diemBaiTap],(err, result) => {
         if (err){
            res.json({message:'add new assignment fail'});
         }
         else{
            //  console.log('kq insert class',result);
            res.json({message:'add new assignment success'});
         }
    }   
       );

});

/*Delete assignment based on id assignment  F*/  
router.delete('/api/deleteAssignment/:idAssignment', function(req, res, next) {
    let idAssignment=req.params.idAssignment;
    let sql='delete from assignment where id=?';
    pool.query(sql,[idAssignment],(error,result)=>{
        if(error){
            res.json({message:'delete  assignment fail'});
        }
        else{
            res.json({message:'delete  assignment success'});
            
        }   
    });

});

/*Edit assignment based on id assignment F */
router.put('/api/editAssignment/:idAssignment', function(req, res, next) {
    let id = req.params.idAssignment;
   // let {tenBaiTap,soDiem, idLop} = req.body;
   let {nameassignment,diemBaiTap, idLop} = req.body;
    console.log('edit edit: ',id);
    //let sql=`UPDATE managerassignment SET tenBaiTap ='${tenBaiTap}',soDiem ='${soDiem}',idLop='${idLop}' WHERE id='${id}'`
    let sql=`UPDATE assignment SET nameassignment ='${nameassignment}',diemBaiTap ='${diemBaiTap}',idclass='${idLop}' WHERE id='${id}'`
    pool.query(sql,(error,result)=>{
        if(error){
            res.json({message:'update an assignment fail'});
        }
        else{
            
            res.json({message:"sucess"});
        }   
    });

});
module.exports= router;