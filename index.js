const express=require('express');
const cookieParser=require('cookie-parser');
const expressLayouts=require('express-ejs-layouts');
const app=express();
const port=8002;
const db=require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');


const { setAuthenticatedUser } = require('./config/passport-local-strategy');
const { Store } = require('express-session');
const MongoStore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(express.static('./assets'));



app.set('view engine','ejs');
app.set('vies','./vies');

//mongo store is used to store the sesson cookie in the db
app.use(session({
    name:'codeial',
    // change the secret before deplyment
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(100*600*100)
    },
    store:new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err ||'connect-mongodb setup ok');
        }
    )

}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',setAuthenticatedUser);

app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`);
    }

    console.log(`the server is runnig on port: ${port}`);
});