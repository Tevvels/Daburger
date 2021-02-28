const express = require('express')
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const expressHandleBars = require('express-handlebars');
app.engine('handlebars', expressHandleBars({ defaultLayout: 'main' }));
app.set('view engine','handlebars');

const routes = require('./controllers/burgers_controller.js');
app.use(routes);

app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`);
})