const connection = require('./connection.js')
const questionMarkMaker = (num) => {
    const arr = [];
    for(i =0; i < num; i++){
        arr.push('?');
    }
    return arr.toString();
};

const objectSql = (obj) => {
    const arr = [];

    for(const key in obj) {
        let value = obj[key];

        if( Object.hasOwnProperty.call(obj,key)) {
            if(typeof value === 'string' && value.indexOf(' ')>= 0){
                value =`'${value}'`;
            }
            arr.push(`${key}=${value}`)
        }
    }
    return arr.toString();
};

const orm = {
    selectAll(tableInput,cb){
        let queryString = `SELECT * FROM ${tableInput};`;
        connection.query(queryString, (err,data)=>{
            // if(err) {throw err}
            cb(data);
        });
    },
    insertOne(tb,obj,condition,callback){

        // console.log(obj.toString(),questionMarkMaker(condition.length))

        let queryString = `INSERT INTO ${tb}`;
        queryString += ' (';
        queryString += obj.toString();
        queryString +=") ";
        queryString +="VALUES (";
        queryString += questionMarkMaker(condition.length);
        queryString += ') ';

        // console.log(condition);
        connection.query(queryString,condition,(err,data)=>{
            if(err) {throw err};
            callback(data);
        })

    }, 
    updateOne(tb,obj,condition,callback){
        let queryString =  `UPDATE ${tb}`;

        queryString += ' SET ';
        queryString += objectSql(obj);
        queryString += ' WHERE ';
        queryString += condition;

        connection.query(queryString, (err,data)=>{
            if(err) {throw err};
            callback(data);
        })
    },
    delete(tb,condition,callback){
        let queryString =`DELETE FROM ${tb}`;
        queryString += ' WHERE ';
        queryString += condition;

        connection.query(queryString, (err,data)=>{
            if(err) {throw err};
            callback(data);
        });
    },
};

module.exports = orm;