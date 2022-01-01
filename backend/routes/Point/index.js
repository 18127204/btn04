var express = require('express');
var router = express.Router();
var pool = require('../Pool');
var passport = require('../../modules/passport');

/*Get array Students With Point with fullName,grade,mssv,assignmentId FINISH*/
router.get('/api/GetStudentsWithPoint/:link', function (req, res, next) {
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
        const sqlRole = `SELECT CA.role FROM classes C INNER JOIN classaccount CA ON C.id=CA.classId INNER JOIN account A
        ON A.id=CA.accountId  WHERE C.link=? and CA.accountId=?`;
        pool.query(sqlRole, [link, user.id], (error, resultRole) => {
            if (error) {
                res.send(error);
            }
            else {
                if (resultRole[0].role === 'teacher') {
                    let resultSqlAccount;
                    let numberStudent;
                    let resultAss;

                    let sqlaccount = `SELECT S.fullName,G.grade,G.mssv,G.assignmentId FROM grade G INNER JOIN assignment Ass ON G.assignmentId=Ass.id
                                    INNER JOIN student S on S.mssv=G.mssv 
                                    INNER JOIN account A ON A.mssv=G.mssv 
                                    INNER JOIN classes CL ON CL.id=Ass.classId WHERE CL.link=?
                                    UNION
                                    SELECT S.fullName , G.grade, G.mssv, G.assignmentId  FROM grade G
                                    INNER JOIN student S ON G.mssv = S.mssv WHERE G.mssv not in ( SELECT G1.mssv  FROM assignment Ass  
                                    INNER JOIN grade G1 ON Ass.id = G1.assignmentId 
                                    INNER JOIN account C ON C.mssv = G1.mssv 
                                    INNER JOIN classes CL ON CL.id=Ass.classId
                                    WHERE CL.link =? )`;
                    pool.query(sqlaccount, [link, link], (error, result) => {
                        if (error) {
                            res.send(error);
                        }
                        resultSqlAccount = result;

                        let sqlGetNumberStudent = `SELECT COUNT(ST.mssv) as SL FROM classes CL INNER JOIN student ST 
                        ON CL.id=ST.classId WHERE CL.link=?`; /// bao nhieu thang hoc lop cung link
                        pool.query(sqlGetNumberStudent, [link], (error, result) => {
                            if (error) {
                                res.send(error);
                            }
                            numberStudent = result[0].SL; /// so luong cua result
                            let sqlGetAllAss = `SELECT ass.id FROM classaccount cla INNER JOIN classes c ON cla.classId=c.id INNER JOIN assignment ass
                            ON c.id=ass.classId WHERE c.link=? and cla.accountId=? ORDER BY ASS.rank ASC`;
                            //lay all assignmen trong link
                            pool.query(sqlGetAllAss, [link, user.id], (error, result1) => {
                                if (error) {
                                    res.send(error);
                                }
                                resultAss = result1;
                                let templateGrade = resultAss.map((item, index) => { return { assignmentId: item.id, grade: 0 } });
                                // res.json(resultSqlAccount);
                                let indexFirst = 0;
                                let indexLast = 0;
                                let resultReturn = [];
                                for (let i = 0; i < Number(numberStudent); i++) {
                                    let temp = {
                                        mssv: resultSqlAccount[indexFirst].mssv,
                                        fullName: resultSqlAccount[indexFirst].fullName,
                                        lstAssAndGrade: []
                                    }
                                    let tempLstGrade = templateGrade.map((item) => {
                                        return { ...item };
                                    })

                                    let indexAssId = tempLstGrade.findIndex(item => item.assignmentId == resultSqlAccount[indexFirst].assignmentId);
                                    tempLstGrade[indexAssId].grade = resultSqlAccount[indexFirst].grade;

                                    for (let j = indexFirst + 1; j < resultSqlAccount.length; j++) {
                                        if (resultSqlAccount[indexFirst].mssv == resultSqlAccount[j].mssv) {
                                            let indexAssiId = tempLstGrade.findIndex(item => item.assignmentId == resultSqlAccount[j].assignmentId);
                                            tempLstGrade[indexAssiId].grade = resultSqlAccount[j].grade;
                                            indexLast = j;
                                        }
                                        else {
                                            temp.lstAssAndGrade = [...tempLstGrade];
                                            resultReturn.push(temp);
                                            indexFirst = j;
                                            indexLast = j;
                                            break;
                                        }
                                    }
                                    if (indexLast + 1 == resultSqlAccount.length) {
                                        temp.lstAssAndGrade = [...tempLstGrade];
                                        resultReturn.push(temp);
                                    }
                                }
                                res.json(resultReturn);

                            });
                        });
                    });
                }
                else if (resultRole[0].role === 'student') {
                    let resultSqlAccount;
                    let resultAss;

                    let sqlaccount = `SELECT S.fullName,G.grade,G.mssv,G.assignmentId FROM grade G INNER JOIN assignment Ass ON G.assignmentId=Ass.id
                                    INNER JOIN student S on S.mssv=G.mssv 
                                    INNER JOIN account A ON A.mssv=G.mssv 
                                    INNER JOIN classes CL ON CL.id=Ass.classId WHERE CL.link=? and A.id=?`;
                    pool.query(sqlaccount, [link, user.id], (error, result) => {
                        if (error) {
                            res.send(error);
                        }
                        resultSqlAccount = result;
                        let sqlGetAllAss = `SELECT ass.id FROM classaccount cla INNER JOIN classes c ON cla.classId=c.id INNER JOIN assignment ass
                        ON c.id=ass.classId WHERE c.link=? and cla.accountId=? ORDER BY ASS.rank ASC`;
                        //lay all assignmen trong link
                        pool.query(sqlGetAllAss, [link, user.id], (error, result1) => {
                            if (error) {
                                res.send(error);
                            }
                            resultAss = result1;
                            let templateGrade = resultAss.map((item) => { return { assignmentId: item.id, grade: 0 } });
                            let indexFirst = 0;
                            let indexLast = 0;
                            let resultReturn = [];
                            let temp = {
                                mssv: resultSqlAccount[indexFirst].mssv,
                                fullName: resultSqlAccount[indexFirst].fullName,
                                lstAssAndGrade: []
                            }
                            let tempLstGrade = templateGrade.map((item) => {
                                return { ...item };
                            })

                            let indexAssId = tempLstGrade.findIndex(item => item.assignmentId == resultSqlAccount[indexFirst].assignmentId);
                            tempLstGrade[indexAssId].grade = resultSqlAccount[indexFirst].grade;

                            for (let j = indexFirst + 1; j < resultSqlAccount.length; j++) {
                                if (resultSqlAccount[indexFirst].mssv == resultSqlAccount[j].mssv) {
                                    let indexAssiId = tempLstGrade.findIndex(item => item.assignmentId == resultSqlAccount[j].assignmentId);
                                    tempLstGrade[indexAssiId].grade = resultSqlAccount[j].grade;
                                    indexLast = j;
                                }
                                else {
                                    temp.lstAssAndGrade = [...tempLstGrade];
                                    resultReturn.push(temp);
                                    indexFirst = j;
                                    indexLast = j;
                                    break;
                                }
                            }
                            if (indexLast + 1 == resultSqlAccount.length) {
                                temp.lstAssAndGrade = [...tempLstGrade];
                                resultReturn.push(temp);
                            }
                            res.json(resultReturn);

                        });

                    });
                }

            }
        });


    }
    )(req, res, next);

});

/*Get number student by link FINISH*/
router.get('/api/GetNumberStudent/:link', function (req, res, next) {
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
        let sqlGetNumberStudent = `SELECT COUNT(ST.mssv) as SL FROM classes CL INNER JOIN student ST 
        ON CL.id=ST.classId WHERE CL.link=?`;
        pool.query(sqlGetNumberStudent, [link], (error, result) => {
            if (error) {
                res.send(error);
            }
            else {
                res.json(result[0].SL);
            }
        });
    }
    )(req, res, next);

});

/*Upload student Excel file FINISH*/
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
        let datasend = req.body.dataSend;
        let arr = JSON.parse(datasend);
        let sql = `SELECT DISTINCT id  FROM classes WHERE link =?`;
        pool.query(sql, [link], (error, result) => {
            if (error) {
                res.send(error);
            }
            else {
                let ID = result[0].id;
                for (let i = 0; i < arr.length; i++) {
                    let sqlinsert = `INSERT INTO student (mssv,classId,fullName) VALUES (?,?,?)`;
                    pool.query(sqlinsert, [arr[i].StudentId, ID, arr[i].FullName], (error, result1) => {
                        if (error) {
                            res.send(error);
                        }
                    });
                }
                res.json({ message: "insert student success" });
            }
        });
    }
    )(req, res, next);
});

/*Teacher Edit Grade FINISH */
router.put('/api/UpdatePointAssigmentStudent/:link', function (req, res, next) {
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
        let { dataSend } = req.body;
        const arrayInfo = dataSend.split(':');

        const sql = `SELECT cl.role,cl.classId FROM classaccount cl INNER JOIN classes c ON cl.classId=c.id WHERE link=?
        and cl.accountId=?`;
        pool.query(sql, [link, user.id], (error, result) => {
            if (error) {
                res.send(error);
            }
            else {
                if (result[0].role === "teacher") {
                    let sqlUpdate = `INSERT INTO grade (mssv,grade,assignmentId,classId) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE grade=?`;
                    pool.query(sqlUpdate, [arrayInfo[0], arrayInfo[2], arrayInfo[1], result[0].classId, arrayInfo[2]], (error, result) => {
                        if (error) {
                            res.send(error);
                        }
                        res.json({ message: `update grade success` });
                    });
                }
            }
        });
    }
    )(req, res, next);
});

/*Get student having account FINISH */
router.get('/api/GetStudentHaveAccount/:link', function (req, res, next) {
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
        let sqlaccount = `SELECT DISTINCT S.fullName,G.mssv,A.email,A.phone FROM grade G INNER JOIN assignment Ass ON G.assignmentId=Ass.id
        INNER JOIN student S on S.mssv=G.mssv 
        INNER JOIN account A ON A.mssv=G.mssv 
        INNER JOIN classes CL ON CL.id=Ass.classId WHERE CL.link=?`
        pool.query(sqlaccount, [link], (error, result) => {
            if (error) {
                res.send(error);
            }
            else {
                res.json(result);
            }
        });
    }
    )(req, res, next);
});










/*Get name assignment based on idLop F*/
// router.get('/api/getNameAssignment/:idLop', function (req, res, next) {
//     let id = req.params.idLop;
//     //let sql='SELECT tenBaiTap FROM managerassignment WHERE idLop=? order by id asc'
//     let sql = 'SELECT nameassignment FROM assignment WHERE idclass=? order by id asc'
//     pool.query(sql, [id], (error, result) => {
//         if (error) {
//             res.send({ message: "get fail" });
//         }
//         else {
//             // console.log('GetALLLis: ',result);
//             res.json(result);

//         }
//     });

/*
> Array [Object { fullName: "Tran Minh Quang", mssv: "18127172", lstAssAndGrade: Array [Object { assignmentId: 5, grade: 0 },
     Object { assignmentId: 6, grade: 0 }, Object { assignmentId: 3, grade: 0 }, Object { assignmentId: 1, grade: 0 }, 
     Object { assignmentId: 2, grade: 0 }, Object { assignmentId: 4, grade: 0 }, Object { assignmentId: 3, grade: 6 }] },

      Object { fullName: "Nguyen Xi", mssv: "18127111", lstAssAndGrade: Array [Object { assignmentId: 5, grade: 0 }, 
        Object { assignmentId: 6, grade: 0 }, Object { assignmentId: 3, grade: 0 }, Object { assignmentId: 1, grade: 0 },
         Object { assignmentId: 2, grade: 0 }, Object { assignmentId: 4, grade: 0 }, Object { assignmentId: 3, grade: 5 }] },
          Object { fullName: "Nguyen Xi", mssv: "18127111", lstAssAndGrade: Array [Object { assignmentId: 5, grade: 0 }, 
            Object { assignmentId: 6, grade: 0 }, Object { assignmentId: 3, grade: 0 }, Object { assignmentId: 1, grade: 0 },
             Object { assignmentId: 2, grade: 0 }, Object { assignmentId: 4, grade: 0 }, Object { assignmentId: 3, grade: 5 }] },
              Object { fullName: "Nguyen An", mssv: "18127166", lstAssAndGrade: Array [Object { assignmentId: 5, grade: 0 }, 
                Object { assignmentId: 6, grade: 0 }, Object { assignmentId: 3, grade: 0 }, Object { assignmentId: 1, grade: 0 },
                 Object { assignmentId: 2, grade: 0 }, Object { assignmentId: 4, grade: 0 }, Object { assignmentId: 3, grade: 6 }] }]



*/
// });

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
// router.get('/api/getStudentWithPointAssignment/:idLop', function (req, res, next) {
//     /* input: idLop
//     * output:[
//     *  {hoten:(trong bảng account),   diemGrade:(trong bảng grade),tenbaitap(tên bài tập)}
//     * ]
//     */
//     let idLop = req.params.idLop;
//     let sql = `SELECT inf.hoten,mpt.grade,mt.nameassignment
//     from assignment mt
//     inner join grade mpt on (mt.id=mpt.idassignment)
//     inner join account inf on (mpt.idstudent=inf.id)
//     WHERE mt.idclass=${idLop}
//     order by mpt.idstudent,mt.id`
//     pool.query(sql, (error, result) => {

//         if (error) {
//             res.send({ message: "fail" });
//         }
//         else {
//             // res.send(result)
//             let fullname = [];
//             let grade = [];
//             const assignment = [];
//             let fin = [];
//             let n = result.length;
//             for (let i = 0; i < result.length; i++) {
//                 fullname.push(result[i].hoten);
//                 grade.push(result[i].grade)
//                 assignment.push(result[i].nameassignment)
//             }
//             let i = 0;
//             let left = 0;
//             let stack = []
//             while (i < n) {

//                 if (fullname[i] == result[left].hoten) {
//                     stack.push({ [assignment[i]]: grade[i] })
//                     i += 1
//                     continue
//                 }
//                 else {
//                     stack.push({ fullname: result[left].hoten })
//                     z = (stack.reduce(function (result, current) {
//                         return Object.assign(result, current);
//                     }, {}));
//                     fin.push(z)
//                     left = i;
//                     stack = []
//                 }

//             }
//             stack.push({ fullname: result[left].hoten })
//             z = (stack.reduce(function (result, current) {
//                 return Object.assign(result, current);
//             }, {}));
//             fin.push(z)

//             for (let i = 0; i < fin.length; i++) {
//                 let y = fin[i];
//                 let x = 0;
//                 for (const property in y) {
//                     if (property !== 'fullname') {
//                         x += Number(y[property]);
//                     }
//                     fin[i] = {tongdiem: x ,...y}
//                 }
//             }
//             console.log('bangdiemmm',fin);
//             return res.json(fin)
//         }
//     });

//     /**
//      * [{hoten:'tan",'toan':9},'hamso:',8},
//      *  {hoten:'tai",'toan':7},'hamso:',6}
//      * ]
//      * for()
//      */
// });

/*Get array Students With Point with fullName,grade,mssv,assignmentId*/
// router.get('/api/GetStudentsWithPoint/:link', function (req, res, next) {
//     passport.authenticate("jwt", { session: false, }, function (err, user, info) {
//         if (err) {
//             return next(err);
//         }
//         if (!user) {
//             res.header({ "Access-Control-Allow-Origin": "*" });
//             res.status(401);
//             res.send({ message: info.message, success: false });
//             return;
//         }
//         let link = req.params.link;
//         let resultSqlAccount;
//         let numberStudent;
//         let resultAss;
//         let sqlaccount = `SELECT S.fullName,G.grade,G.mssv,G.assignmentId FROM grade G 
//                         INNER JOIN assignment Ass ON G.assignmentId=Ass.id
//                         INNER JOIN student S on S.mssv=G.mssv 
//                         INNER JOIN account A ON A.mssv=G.mssv 
//                         INNER JOIN classes CL ON CL.id=Ass.classId WHERE CL.link=?
//                         UNION
//                         SELECT S.fullName , G.grade, G.mssv, G.assignmentId  FROM grade G
//                         INNER JOIN student S ON G.mssv = S.mssv WHERE G.mssv not in ( SELECT G1.mssv  FROM assignment Ass  
//                         INNER JOIN grade G1 ON Ass.id = G1.assignmentId 
//                         INNER JOIN account C ON C.mssv = G1.mssv 
//                         INNER JOIN classes CL ON CL.id=Ass.classId
//                         WHERE CL.link =? )`;

//         pool.query(sqlaccount, [link, link], (error, result) => {
//             if (error) {
//                 res.send(error);
//             }
//             else {
//                 let sqlnumclass = `SELECT ass.id FROM classes C INNER JOIN assignment ass
//             ON C.id=ass.classId WHERE C.link =? ORDER BY ass.rank ASC`
//                 pool.query(sqlnumclass, [link], (error, result1) => {
//                     if (error) {
//                         res.send(error);
//                     }
//                     let temass = []
//                     for (let assid = 0; assid < result1.length; assid++) {
//                         temass.push(result1[assid].id);
//                     }
//                     resultSqlAccount = result;
//                     let fullname = [];
//                     let Grade = [];
//                     let assignment = [];
//                     let mssv = []
//                     let fin = [];
//                     let n = result.length;
//                     for (let i = 0; i < result.length; i++) {
//                         fullname.push(result[i].fullName);
//                         mssv.push(result[i].mssv);
//                         Grade.push(result[i].grade)
//                         assignment.push(result[i].assignmentId)
//                     }
//                     let unique = assignment.filter((v, l, a) => a.indexOf(v) === l);
//                     let i = 0;
//                     let left = 0;
//                     let stack = []
//                     let lstGrade = [];
//                     let tem = [];
//                     while (i < n) {
//                         if (fullname[i] === result[left].fullName) {
//                             lstGrade.push({
//                                 assignmentId: assignment[i],
//                                 grade: Grade[i]
//                             })
//                             tem.push(assignment[i]);
//                             i += 1;
//                             continue
//                         }
//                         else {
//                             for (let k = 0; k < temass.length; k++) {
//                                 if (tem.includes(temass[k])) {
//                                     continue;
//                                 }
//                                 else {
//                                     lstGrade.push({
//                                         assignmentId: temass[k],
//                                         grade: 0
//                                     })
//                                 }
//                             }
//                             stack.push({ fullname: result[left].fullName, mssv: result[left].mssv, lstGrade: lstGrade })
//                             fin= fin.concat(stack)
//                             lstGrade = [];
//                             tem = []
//                             left = i;
//                             stack = []
//                         }

//                     }
//                     for (let k = 0; k < unique.length; k++) {
//                         if (tem.includes(unique[k])) {
//                             continue;
//                         }
//                         else {
//                             lstGrade.push({
//                                 assignmentId: unique[k],
//                                 grade: 0
//                             })
//                         }
//                     }
//                     stack.push({ fullname: result[left].fullName, mssv: result[left].mssv, lstGrade: lstGrade })
//                     fin=fin.concat(stack)
//                     return res.json(fin)
//                 });
//             }

//         });

//     })(req, res, next);
// });





module.exports = router;