const express=require('express');
const app=express();
const port=8000;

app.use('/',require('./routes'));
app.set('view engine','ejs');
app.set('vies','./vies');
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`);
    }

    console.log(`the server is runnig on port: ${port}`);
});