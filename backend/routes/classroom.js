var express = require('express');
var router = express.Router();
var pool = require('./pool');
var passport = require('../modules/passport');



/*Create class FINISH */
router.post('/api/CreateClass', function (req, res, next) {
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
        //input:{na}
        let {name, description, room} =req.body;
        let link=new Date();
        let newLink=link.getTime();
        const sqlCreateClass = 'insert into classes (name,description,room,link,creatorId) values(?,?,?,?,?)'

        pool.query(sqlCreateClass, [name, description, room, newLink,user.id ], (error, result) => {
            if (error) {
                res.send(error);
            }
            else {
                const sqlCreateClassAccount = "insert into classaccount (accountId,classId,role) values(?,LAST_INSERT_ID(),?)"
                pool.query(sqlCreateClassAccount, [user.id,"teacher"], (error, result) =>  {
                    if (error) {
                        res.send(error);
                    }
                    else {
                        res.json(result);
                    }
                })
                
            }
        });



    }
    )(req, res, next);
});

/*Get all list classroom with idPlayer  FINISH*/
router.get('/api/GetListClasses', function (req, res, next) {
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
        const sql = `SELECT name, description,room, link FROM classes INNER JOIN classaccount ON classID=id
        WHERE accountId=?
        `
        pool.query(sql, [user.id], (error, result) => {
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



/*Get value detail classroom based on link */
router.get('/api/ShowDetailClass/:link', function (req, res, next) {
});


/*Get teachers in classroom based on link */
router.get('/api/ShowListTeachers/:link', function (req, res, next) {
});

/*Get students in classroom based on link */
router.get('/api/ShowListStudents/:link', function (req, res, next) {
});

/*Join classroom by link */
router.get('/api/joinClassByLink', function (req, res, next) {

});
/*add people to classroom by id */
router.post('/api/AddPeopleClassroom', function (req, res, next) {

});














// /*Get all list classroom with check param: idNguoiThamGia F */
// router.get('/api/GetALLListClassroom/:idNguoiThamGia', function (req, res, next) {
//     let idNTGia = req.params.idNguoiThamGia;
//     // let sql='select distinct tenlophoc,phan,chude,phong,duonglink from classroom where id_nguoithamgia= ? or id_chuphong=?'
//     let sql = 'select * from class where id in (select idclass from classaccount where idpeople=?)'
//     pool.query(sql, [idNTGia], (error, result) => {
//         if (error) {
//             res.send(error);
//         }
//         else {
//             // console.log('GetALLLis: ',result);
//             res.json(result);

//         }
//     });

// });

// /*Create classroom F*/
// router.post('/api/AddNewClassroom', function (req, res, next) {
//     //let {id_nguoithamgia,tenlophoc,phan,chude,phong,duonglink,id_chuphong}=req.body;
//     let { id_nguoithamgia, tenlophoc, phong, duonglink } = req.body;
//     // let sqlNewClass="insert into classroom (id_nguoithamgia,tenlophoc,phan,chude,phong,duonglink,id_chuphong) values(?,?,?,?,?,?,?)";
//     let sqlNewClass = "insert into class (nameclass,room,duonglink) values(?,?,?);";
//     pool.query(sqlNewClass, [tenlophoc, phong, duonglink], (err, result) => {
//         // if (err) {
//         //     res.json({ message: 'add new class fail' });
//         // }
//         // else {
//         //     //  console.log('kq insert class',result);
//         //     res.json({ message: 'add new class success' });
//         // }

//         if (err) {
//             res.json({ message: 'add new class fail' });
//         }
//         else {
//             let sqlAddclassaccount=`insert into classaccount (idpeople,idclass,role) select ${id_nguoithamgia},id,'gv' from class where duonglink=?`;
//             pool.query(sqlAddclassaccount, [duonglink], (error, result) => {
//                 if (error) {
//                     res.send(error);
//                 }
//                 else {
//                     res.json({ message: 'add new class success' });
//                 }
//             });
//         }        
//     }
//     );

// });

// /*Get value detail classroom based on link F */
// router.get('/api/detailClassroom/:duonglink', function (req, res, next) {
//     let linkFind = '/classroom/' + req.params.duonglink;
//   //  let sql = 'select distinct id,tenlophoc,phan,chude,phong,duonglink,id_chuphong from classroom where duonglink=? limit 1';
//     let sql = 'select distinct * from class where duonglink=? limit 1';
//     console.log('duong link  ', linkFind);
//     pool.query(sql, [linkFind], (error, result) => {
//         if (error) {
//             res.send(error);
//         }
//         else {
//             res.json(result);
//             // console.log(result);
//         }
//     });

// });

// /*Get teachers in classroom based on link F */
// router.get('/api/teacherClassroom/:duonglink', function (req, res, next) {
//     let linkFind = '/classroom/' + req.params.duonglink;
//     //let sql = 'select * from infomation where id in (select distinct id_chuphong from classroom where duonglink=?)';
//     let sql = "select hoten from account where id in ( select idpeople from classaccount where role='gv' and idclass in (select id from class where duonglink=?))";
//     pool.query(sql, [linkFind], (error, result) => {
//         if (error) {
//             res.send(error);
//         }
//         else {
//             res.json(result);
//             // console.log(result);
//         }
//     });

// });

// /*Get students in classroom based on link F*/
// router.get('/api/studentClassroom/:duonglink', function (req, res, next) {
//     let linkFind = '/classroom/' + req.params.duonglink;
//     //let sql = 'select * from infomation where id in (select distinct id_nguoithamgia from classroom where duonglink=? and id_nguoithamgia not in (select distinct id_chuphong from classroom where duonglink=?))';
//     let sql = "select hoten from account where id in ( select idpeople from classaccount where role='sv' and idclass in (select id from class where duonglink=?))";
//     pool.query(sql, [linkFind], (error, result) => {
//         if (error) {
//             res.send(error);
//         }
//         else {
//             res.json(result);
//             // console.log(result);
//         }
//     });

// });

// /*Join classroom by link F hmmm*/
// router.get('/api/joinClassroom/:duonglink', function (req, res, next) {
//     let linkFind = '/classroom/' + req.params.duonglink;
//     let sqlFindLink = 'select distinct tenlophoc,phan,chude,phong,duonglink from classroom where duonglink=?';

//     pool.query(sqlFindLink, [linkFind], (error, result) => {
//         if (error) {
//             res.send(error);
//         }
//         else {
//             console.log('join thanh cong', result);
//             res.json(result);

//         }
//     });

// });
// /*add people to classroom by id F hmmm*/
// router.post('/api/AddPeopleClassroom', function (req, res, next) {
//     let { id_nguoithamgia, duonglink } = req.body;
//     let linkFind = '/classroom/' + duonglink;
//     let sqlFindClass = "insert into classroom (id,tenlophoc,phan,chude,phong,duonglink,id_chuphong,id_nguoithamgia) select id,tenlophoc,phan,chude,phong,duonglink,id_chuphong,? from classroom where duonglink=? limit 1";
//     pool.query(sqlFindClass, [id_nguoithamgia, linkFind], (err, result) => {
//         if (err) {
//             console.log('add people class fail');
//             res.json({ message: 'add people class fail' });
//         }
//         else {
//             console.log('add people class success', result);
//             res.json({ message: 'add people success' });
//         }
//     }
//     );

// });

module.exports = router;