
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var pool = require('../../routes/pool');


passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, username, password, done) {
        username = req.body.username;
        password = req.body.password;
        let sqlAccount = 'select * from account where username=? and password =?';
        pool.query(sqlAccount, [req.body.username, req.body.password], (error, result) => {
            if (error) {
                res.send(error);
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            else {

                let people = result;
                if (people.length) {
                    return done(null, people[0]);
                }

                // if(people.length){
                //     let sqlInfomation='select hoten,email,sodienthoai,diachi from infomation where id=?';
                //     pool.query(sqlInfomation,[people[0].id],(error,resu)=>{
                //         if(error){
                //             res.send(error);
                //             return done(null, false, { message: 'Incorrect username or password.' });
                //         }
                //         else{
                //             let resultReturn={...people[0],...resu[0]};
                //             delete resultReturn.password;
                //             return done(null,resultReturn);
                //         }
                //     })

                // }
                else {
                    return done(null, false, { message: 'Incorrect username or password.' });
                }

            }
        })
    }
));

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload);
    return done(null, { id: jwt_payload.id, username: jwt_payload.username });//req.user
}));
module.exports = passport;