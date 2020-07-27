const express=require('express');
const cookieParser=require('cookie-parser');
const expressLayouts=require('express-ejs-layouts');
const app=express();
const port=8000;
const db=require('./config/mongoose');


app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(express.static('./assets'));


app.use('/',require('./routes'));
app.set('view engine','ejs');
app.set('vies','./vies');
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`);
    }

    console.log(`the server is runnig on port: ${port}`);
});