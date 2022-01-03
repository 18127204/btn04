const express = require('express');
const router = express.Router();
var pool=require('../Pool');
var passport=require('../../modules/passport');

router.post('/api/CreateNotice', function (req, res, next) {
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
        let {link,notice} =req.body;
        const sql = `SELECT CA.role FROM classes C INNER JOIN classaccount CA ON C.id=CA.classId INNER JOIN account A
        ON A.id=CA.accountId  WHERE C.link=? and CA.accountId=?`;

        pool.query(sql, [link,user.id], (error, result) => {
            if (error) {
                res.send(error);
            }
            else {
                if (result[0].role === "teacher") {
                const sqlstudent = `SELECT DISTINCT G.mssv,C.id FROM grade G INNER JOIN  classes C ON C.id=G.classId WHERE C.link =?`
                
                pool.query(sqlstudent, [link], (error, result1) =>  {
                    if (error) {
                        res.send(error);
                    }
                    else {
                        for (let j = 0 ;j < result1.length; ++j) {
                            const sqlinsetnotice = `INSERT INTO notification (classId,senderId,recipientId,notice)
                            VALUES (?,?,?,?)`;
                            
                            pool.query(sqlinsetnotice, [result1[j].id ,user.id,result1[j].mssv,notice], (error, result1) =>  {
                                if (error) {
                                    res.send(error);
                                }
                            })

                        }
                        res.json({message:"insert notice success"});
                    }
                })
                }
                else {
                    res.json("you must not notice");
                }
                
            }

        });



    }
    )(req, res, next);
});
module.exports = router;