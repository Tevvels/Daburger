//MySQL connection

const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    //Password here
    password:'Flargin2',
    database:'burgers_db'
})

//make connection
connection.connect((err)=>{
    if(err){
        console.log(`error connecting: ${err.stack}`)
        return

    }
    console.log(`connected as id${connection.threadId}`);

});


//export connection for the orm
module.exports = connection;