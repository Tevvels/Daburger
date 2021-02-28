const orm = require('../config/orm.js');
const burger = {
    selectAll(cb) {
        orm.selectAll('burgers',(res) =>cb(res));
    },
    insertOne(columns,values,callback){
        // console.log(columns,values)
        orm.insertOne('burgers',columns,values,(res)=>callback(res));
    },
    updateOne(columns,condition,callback){
        orm.updateOne('burgers',columns,condition,(res)=>callback(res));
    },
};

module.exports = burger;
