var express=require('express');
var router=express.Router();
var pool=require('./pool');
var passport=require('../modules/passport');

/*Create account */  
router.post('/', function(req, res, next) {
    let {hoten,email, sodienthoai,diachi,username,password,studentid}=req.body;

    let sqlAccount="insert into account (hoten,email, sodienthoai,diachi,username,password,studentid) values(?,?,?,?,?,?,?)";
    pool.query(sqlAccount,[hoten,email, sodienthoai,diachi,username,password,studentid],(error, result) => {
         if (error){
             res.json({message:'registerfail'});
         } 
         else{
            res.json({message:'registersuccess'});
            //  let sqlInfor='insert into infomation (hoten,email,sodienthoai,diachi) values(?,?,?,?)';
            //  pool.query(sqlInfor,[hoten,email,sodienthoai,diachi],(error,result)=>{
            //     if(error){
            //         res.json({message:'registerfail'});
            //     }
            //     else{
            //         res.json({message:'registersuccess'});
            //     }
            //  });
         }

        }
        
       );

});



module.exports= router;