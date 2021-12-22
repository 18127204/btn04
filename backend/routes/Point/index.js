var express = require('express');
var router = express.Router();
var pool=require('../Pool');
var passport=require('../../modules/passport');
const { response } = require('express');

/*Get name assignment based on idLop F*/
router.get('/api/getNameAssignment/:idLop', function (req, res, next) {
    let id = req.params.idLop;
    //let sql='SELECT tenBaiTap FROM managerassignment WHERE idLop=? order by id asc'
    let sql = 'SELECT nameassignment FROM assignment WHERE idclass=? order by id asc'
    pool.query(sql, [id], (error, result) => {
        if (error) {
            res.send({ message: "get fail" });
        }
        else {
            // console.log('GetALLLis: ',result);
            res.json(result);

        }
    });

});

/*Get name student and their point assignments based on idLop */
// router.get('/api/getStudentWithPointAssignment/:idLop', function(req, res, next) {
//     /**
//      * input: idLop
//      * output:[
//      *  {hoten:(trong bảng account),   diemGrade:(trong bảng grade),tenbaitap(tên bài tập)}
//      * ]
//      */
//     let idLop=req.params.idLop;
//     let sql=`SELECT inf.hoten,mpt.diem,mt.tenBaiTap
//     from managerassignment mt
//     inner join managerpointeachassignment mpt on (mt.id=mpt.idAssignment)
//     inner join infomation inf on (mpt.idHocSinh=inf.id)
//     WHERE mt.idLop=${idLop}
//     order by mpt.idHocSinh,mt.id`
//     pool.query(sql,(error,result)=>{
//         if(error){
//             res.send({message:"fail"});
//         }
//         else{
//             let fullname = [];
//             let grade = [];
//             const assignment = [];
//             let fin = [];
//             let n= result.length;
//             for (let i = 0; i<result.length; i++) {
//                 fullname.push(result[i].hoten);
//                 grade.push(result[i].diem)
//                 assignment.push(result[i].tenBaiTap)
//             }
//             let i=0;
//             let left=0;
//             let stack = []
//             while (i < n) {

//                 if (fullname[i] == result[left].hoten) {
//                         stack.push({[assignment[i]]:grade[i]})
//                         i+=1
//                         continue
//                 }
//                 else {
//                         stack.push({fullname:result[left].hoten})
//                         z=(stack.reduce(function(result, current) {
//                             return Object.assign(result, current);
//                         }, {}));
//                         fin.push(z)
//                         left =i;
//                         stack= []
//                     }

//             }
//             stack.push({fullname:result[left].hoten})
//             z=(stack.reduce(function(result, current) {
//                     return Object.assign(result, current);
//                     }, {}));
//             fin.push(z)
//             return res.json(fin)
//         }   
//     });
// });


//F
router.get('/api/getStudentWithPointAssignment/:idLop', function (req, res, next) {
    /* input: idLop
    * output:[
    *  {hoten:(trong bảng account),   diemGrade:(trong bảng grade),tenbaitap(tên bài tập)}
    * ]
    */
    let idLop = req.params.idLop;
    let sql = `SELECT inf.hoten,mpt.grade,mt.nameassignment
    from assignment mt
    inner join grade mpt on (mt.id=mpt.idassignment)
    inner join account inf on (mpt.idstudent=inf.id)
    WHERE mt.idclass=${idLop}
    order by mpt.idstudent,mt.id`
    pool.query(sql, (error, result) => {

        if (error) {
            res.send({ message: "fail" });
        }
        else {
            // res.send(result)
            let fullname = [];
            let grade = [];
            const assignment = [];
            let fin = [];
            let n = result.length;
            for (let i = 0; i < result.length; i++) {
                fullname.push(result[i].hoten);
                grade.push(result[i].grade)
                assignment.push(result[i].nameassignment)
            }
            let i = 0;
            let left = 0;
            let stack = []
            while (i < n) {

                if (fullname[i] == result[left].hoten) {
                    stack.push({ [assignment[i]]: grade[i] })
                    i += 1
                    continue
                }
                else {
                    stack.push({ fullname: result[left].hoten })
                    z = (stack.reduce(function (result, current) {
                        return Object.assign(result, current);
                    }, {}));
                    fin.push(z)
                    left = i;
                    stack = []
                }

            }
            stack.push({ fullname: result[left].hoten })
            z = (stack.reduce(function (result, current) {
                return Object.assign(result, current);
            }, {}));
            fin.push(z)

            for (let i = 0; i < fin.length; i++) {
                let y = fin[i];
                let x = 0;
                for (const property in y) {
                    if (property !== 'fullname') {
                        x += Number(y[property]);
                    }
                    fin[i] = {tongdiem: x ,...y}
                }
            }
            console.log('bangdiemmm',fin);
            return res.json(fin)
        }
    });

    /**
     * [{hoten:'tan",'toan':9},'hamso:',8},
     *  {hoten:'tai",'toan':7},'hamso:',6}
     * ]
     * for()
     */
});


router.post('/api/UploadStudentsExcelFile/:link', function (req, res, next) {
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
        let link = req.params.link;
        let arr = [{mssv:"18127192",fullName:"quang"},{mssv:"18127111",fullName:"tan"}];
        // let datasend= req.body.dataSend;
        // let arr =JSON.parse(datasend);
        // var stack = [];
        // var count = 0;
        // let i = 1;
        // while (i <= datasend.length-1) {
        //     let tem ={};
        //     if (datasend[i]=='{') {
        //         let mssv = datasend.substring(i+1,i+5);
        //         i+=6; 
        //         let tem1 =""
        //         while (datasend[i]!=','){
        //             tem1+=datasend[i];
        //             i+=1;
        //         }
        //         tem[mssv]=tem1;
        //         let fullName = datasend.substring(i+1,i+9);
        //         i+=10;
        //         tem1=""
        //         while (datasend[i]!='}') {
        //             tem1+=datasend[i];
        //             i+=1;
        //         }
        //         tem[fullName]=tem1;
        //         i+=1
        //     }
        //     stack.push(tem)
        //     i++;
        // }
        let sql = `SELECT DISTINCT id  FROM classes WHERE link =?`;
        pool.query(sql, [link], (error, result) => {
            if (error) {
                res.send(error);
            }
            else {
                let ID = result[0].id;
                for(let i = 0 ; i<arr.length;i++) {
                    let sqlinsert = `INSERT INTO student (mssv,classId, fullName)
                    VALUES (?,?,?)`;

                    pool.query(sqlinsert, [arr[i].mssv,ID,arr[i].fullName], (error, result1) => {
                        if (error) {
                            res.send(error);
                        }
                        else {
                            res.json({message:"insert student success"});
                           
                        }
                    });

                }
            }
        });
    }
    )(req, res, next);
});


router.get('/api/gg/:link',function (req, res, next) {
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
        let link = req.params.link;
        let sqlaccount = `SELECT S.fullName,G.grade,G.mssv,G.assignmentId FROM grade G INNER JOIN assignment Ass ON G.assignmentId=Ass.id
                        INNER JOIN student S on S.mssv=G.mssv 
                        INNER JOIN account A ON A.mssv=G.mssv 
                        INNER JOIN classes CL ON CL.id=Ass.classId WHERE CL.link=?`;
        pool.query(sqlaccount, [link], (error, result) => {
            if (error) {
                res.send(error);
            }
            else {
                let sqlNotacc = `SELECT S.fullName , G.grade, G.mssv, G.assignmentId  FROM grade G
                            INNER JOIN student S ON G.mssv = S.mssv WHERE G.mssv not in ( SELECT G1.mssv  FROM assignment Ass  
                         INNER JOIN grade G1 ON Ass.id = G1.assignmentId 
                         INNER JOIN account C ON C.mssv = G1.mssv 
                         INNER JOIN classes CL ON CL.id=Ass.classId
                         WHERE CL.link =? )`;
                pool.query(sqlNotacc, [link], (error, result1) => {
                    if (error) {
                        res.send(error);
                    }
                    else {
                       let final = result.concat(result1);
                       res.json(final);
                    }
                });
               
            }
        });
    }
    )(req, res, next);

})


router.put('/api/UpdatePointAssignmentStudent/:link', function (req, res, next) {
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
        let link =req.params.link;
        const sql = `SELECT cl.role FROM classaccount cl INNER JOIN classes c ON cl.classId=c.id WHERE link=?
        and cl.accountId=?`;
        pool.query(sql, [link,user.id], (error, result) => {
            if (error) {
                res.send(error);
            }
            else {
                if (result[0].role==="teacher") {
                    let sqlUpdate =`UPDATE grade
                    SET grade = ?
                    WHERE mssv=? and assignmentId=?`;

                    pool.query(sqlUpdate, [link,user.id], (error, result) => {
                        if (error) {
                            res.send(error);
                        }
                    });
                    
                }
            }
        });
    }
    )(req, res, next);
});


module.exports = router;