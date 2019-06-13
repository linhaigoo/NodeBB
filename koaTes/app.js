const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const model = require('./model');
const template = require('./template');
const isProduction = process.env.NODE_ENV === 'production';
const mongoose = require('mongoose');

const session = require('koa-session');
const userauth = require('koa-passport');


const db = mongoose.connect('mongodb://admin:admin1234@localhost:27017/TRT',{useNewUrlParser: true}).then(
    ()=>{console.log('connect db')},
    (error)=>{
    console.log(error);
    console.log('exit');
    process.exit(1);}
)

const app = new Koa();

app.use(async (ctx,next)=>{
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
    var
        start = new Date().getTime(),
        execTime;
    await next();

    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// Nginx proxy when in production env
if (! isProduction) {
    let staticFiles = require('./static_file');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

app.use(bodyParser());

app.keys = ['secret'];
app.use(session({},app));

template('view', {
    noCache: !isProduction,
    watch: !isProduction
},app);

app.use(controller());

app.listen(3000);
console.log('koa app started at port 3000 ');