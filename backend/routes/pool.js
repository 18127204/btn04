var mysql=require('mysql');
var connect =mysql.createConnection({
    // host:'sql6.freemysqlhosting.net',
    // user:'sql6451769',
    // password:'HjAfHJhdkU',
    // database:'sql6451769',
    // connectionLimit:10

    host:'sql6.freemysqlhosting.net',
    user:'sql6455570',
    password:'KPp3AWDGUA',
    database:'sql6455570',
    connectionLimit:50

    // host:'localhost',
    // user:'root',
    // password:'',
    // // database:'manageclassrooms',
    // database:'manageclass',
    // connectionLimit:50
})
module.exports=connect;
