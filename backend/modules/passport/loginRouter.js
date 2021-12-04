var express=require('express');
var router=express.Router();
var passport=require('./index');
var jwt = require('jsonwebtoken');

router.post('/',passport.authenticate('local',{session:false}),(req, res, next)=>{
    res.json({
        success:true,
        content:req.user,
        tokenAccess:jwt.sign({
            id:req.user.id,
            username:req.user.username
        },
        'secret',
        { expiresIn:'1h'})
    });
});
module.exports = router;