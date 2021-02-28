const express = require('express');
const router = express.Router();

const burger = require('../models/burger.js');

router.get('/',(req,res)=> {
    burger.selectAll((data)=>{
        const handlebarsObject = {
            burgers: data,
        };
        console.log(handlebarsObject);
        res.render('index',handlebarsObject);
    });
});

router.post('/api/burgers', (req,res) =>{
//  console.log(req.bodyburger_name);
    burger.insertOne(['burger_name','devoured'],[req.body.burger_name, req.body.devoured], (data)=> {
        res.json({id: data.insertId});
    });
});

router.put('/api/burgers/:id',(req,res)=>{
    // console.log(req.params.id)
    const condition =  `id = ${req.params.id}`;
    // console.log(condition);
    burger.updateOne(
        {
            devoured:req.body.devoured,
        },
        condition,
        (data)=>{
            if(data.changedRow){
                return res.status(404).end();

            }
            res.status(200).end();
        }

    )
});

module.exports = router;