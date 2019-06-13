const passport = require('koa-passport');

var fn_logout = async (ctx,next)=>{
    ctx.redirect('/');
    ctx.logout();
};

module.exports = {
    'GET /logout' : fn_logout,
};