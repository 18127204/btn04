const express = require('express');
const router = express.Router();
var pool=require('../Pool');
var passport=require('../../modules/passport');
var jwt = require('jsonwebtoken');
const { response } = require('../../app');
router.get('/api/getAllComments/:link/:idassiment', function (req, res, next) {
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
        //jwt id user user={id:'1',username:'tanthai'}
        //write code:
        let link = req.params.link;
        let idass = req.params.idassiment;
        let sqlRole = `SELECT CA.role FROM classes C INNER JOIN classaccount CA ON C.id=CA.classId INNER JOIN account A
        ON A.id=CA.accountId  WHERE C.link=? and CA.accountId=?`;
        pool.query(sqlRole, [link,user.id], (error, result) => {
            if (error) {
                res.send(error);
            }
            else {
                 if (result[0].role ==="teacher") {

                   let sqlTeacher =`SELECT * FROM comment C WHERE C.assignmentId=?`
                   pool.query(sqlTeacher , [idass], (error, result1) => {
                    if (error) {
                        res.send(error);
                    }
                    else {
                        res.json(result1);
                    }
                    });

                 }
                else if (result[0].role ==="student"){
                    const sqlStudent = `SELECT C.id,C.comment,C.username,C.accountId,C.parentid,C.createat,C.assignmentId,C.finalgrade
                    from comment C INNER JOIN grade G on G.assignmentId=C.assignmentId
                                   INNER JOIN assignment Ass ON Ass.id=G.assignmentId
                                   INNER JOIN classes cl ON cl.id=Ass.classId
                                   INNER JOIN classaccount cla ON (cla.classId=cl.id and C.accountId=cla.accountId)
                                   INNER JOIN account A ON (A.mssv =G.mssv and A.id=cla.accountId)
                                   WHERE cl.link=? and Ass.id=? and cla.accountId=? and C.parentid=?
                    `
                    pool.query(sqlStudent, [link,idass,user.id,0], (error, result1) => {
                        if (error) {
                            res.send(error);
                            
                        }
                        else {
                            let sqlchildren=`SELECT * FROM comment  WHERE comment.parentid=?`;
                            pool.query(sqlchildren , [result1[0].id], (error, result2) => {
                                if (error) {
                                    res.send(error);
                                }
                                else {
                                    let final = result1.concat(result2);
                                    res.json(final);
                                    
                                }
                                });

                        }
                        });
                }
            }
        });
    }
    )(req, res, next);
});
module.exports = router;