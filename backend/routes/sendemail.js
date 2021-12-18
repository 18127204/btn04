var express=require('express');
var router=express.Router();
var pool=require('./pool');
var passport = require('../modules/passport');
var nodemailer = require('nodemailer');

router.post('/SendEmailTeacher',(req, res, next)=>{
    passport.authenticate("jwt", { session: false, }, function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.header({ "Access-Control-Allow-Origin": "*" });
            res.status(401);
            res.send({ message: info.message, success: false });
            return;
        }

        let {emailNguoiNhan,link}=req.body;
        const parseLink = link.split('/');
        const classLink = parseLink[parseLink.length - 1];
    
        let contentSend = `
        <p>Hi ${emailNguoiNhan}</p>
        <p>Please join to class with link: ${link}</p>
        <p>Please not share for anyone</p>
        <p>Thank you!</p>`;
    
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `tanthai172k@gmail.com`, 
                pass: `manchester666A`  
            },
            tls: {
                rejectUnauthorized: false
            }
         });
    
        let mailOptions = {
            from: `tanthai172k@gmail.com`, // sender address
            to: `${emailNguoiNhan}`,
            subject: "Invited class",
            html: contentSend
        }
    
        transporter.sendMail(mailOptions, function (error, info) {
            if(error){
                console.log('loi roi',error);
                return;
            }
            console.log('sent',info.response);
            const sqlFindIdTeacher=`SELECT id from account where email=?`;
            pool.query(sqlFindIdTeacher,[emailNguoiNhan],(error,result)=>{
                if(error){
                    res.send(error);
                }
                else if(result.length){
                    let accountId=result[0].id;
                    const sqlFindIdClass=`SELECT id from classes where link=?`;
                    pool.query(sqlFindIdClass,[classLink],(error,result)=>{
                        if(error){
                            res.send(error);
                        }
                        else{
                            const sqlInsertClassAccount=`INSERT INTO classaccount (accountId,classId,role) values(?,?,?)`;
                            pool.query(sqlInsertClassAccount,[accountId,result[0].id,"teacher"],(error,result)=>{
                                if(error){
                                    res.send(error);
                                }
                                else{
                                    res.json({status:true,message:"Send success"});
                                }
                            });
                        }   
                    });
                }
                else{
                    res.json({status:false,message:"email not exist"});
                }
            });
            
        });

    }
    )(req, res, next);
})

router.post('/SendEmailStudent',(req, res, next)=>{
    let {emailNguoiNhan,link}=req.body;
    const parseLink = link.split('/');
    const classLink = parseLink[parseLink.length - 1];

    let contentSend = `
    <p>Hi ${emailNguoiNhan}</p>
    <p>Please join to class with link: ${link}</p>
    <p>Please not share for anyone</p>
    <p>Thank you!</p>`;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `tanathai79@gmail.com`, 
            pass: `Abc123456!`  
        },
        tls: {
            rejectUnauthorized: false
        }
     });

    let mailOptions = {
        from: `tanathai79@gmail.com`, // sender address
        to: `${emailNguoiNhan}`,
        subject: "Invited class",
        html: contentSend,
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if(error){
            console.log('loi roi',error);
            return;
        }
        console.log('sent',info.response);
        //let sqlInsertTeacher='insert into classroom (id,tenlophoc,phan,chude,phong,duonglink,id_chuphong,id_nguoithamgia) values(?,?,?,?,?,?,(select id from infomation where email=?),(select id from infomation where email=?))';
        const sqlFindIdTeacher=`SELECT id from account where email=?`;
        pool.query(sqlFindIdTeacher,[emailNguoiNhan],(error,result)=>{
            if(error){
                res.send(error);
            }
            else if(result.length){
                let accountId=result[0].id;
                const sqlFindIdClass=`SELECT id from classes where link=?`;
                pool.query(sqlFindIdClass,[classLink],(error,result)=>{
                    if(error){
                        res.send(error);
                    }
                    else{
                        const sqlInsertClassAccount=`INSERT INTO classaccount (accountId,classId,role) values(?,?,?)`;
                        pool.query(sqlInsertClassAccount,[accountId,result[0].id,"teacher"],(error,result)=>{
                            if(error){
                                res.send(error);
                            }
                            else{
                                res.json({status:true,message:"Send success"});
                            }
                        });
                    }   
                });
            }
            else{
                res.json({status:false,message:"email not exist"});
            }
        });
        
    });
})

router.post('/SendEmailTeacher111',(req, res, next)=>{
    passport.authenticate("jwt", { session: false, }, function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.header({ "Access-Control-Allow-Origin": "*" });
            res.status(401);
            res.send({ message: info.message, success: false });
            return;
        }

        let {emailNguoiNhan,link}=req.body;
        let contentSend = `
        <p>Hi ${emailNguoiNhan}</p>
        <p>Please join to class with link: ${link}</p>
        <p>Please not share for anyone</p>
        <p>Thank you!</p>`;
    
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                // user: `tanathai79@gmail.com`, 
                // pass: `Abc123456!`  
                user: `tanathai79@gmail.com`, 
                pass: `Abc123456!`  
            },
            tls: {
                rejectUnauthorized: false
            }
         });
    
        let mailOptions = {
            from: `tanathai79@gmail.com`, // sender address
            // to: `${emailNguoiNhan}`,
            to: `tuhoa123abc@gmail.com`,
            subject: "Invited class",
            html: contentSend,
        }
    
        transporter.sendMail(mailOptions, function (error, info) {
            if(error){
                console.log('loi roi',error);
                return;
            }
            console.log('sent',info.response);
            res.send(info);
            
        });

    }
    )(req, res, next);
})

router.post('/sendtestemail',(req,res,next)=>{
    let {emailNguoiGui,passEmail,emailNguoiNhan,duongLinkFull}=req.body;
    // res.json({message:emailNguoiGui});

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // user: `tanathai79@gmail.com`, 
            // pass: `Abc123456!`  
            user: `tanthai172k@gmail.com`, 
            pass: `manchester666A`  
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
    // from: `tanathai79@gmail.com`, // sender address
    from: `tanthai172k@gmail.com`, // sender address
    to: `tuhoa123abc@gmail.com`,
    subject: "Invited class",
    text:'www111'
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if(error){
            console.log('loi roi',error);
            return;
        }
        console.log('sent123',info.response);
        res.send(info);
    });
})


module.exports= router;