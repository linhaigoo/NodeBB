const authpassport = require('./../util/auth');

var fn_login_index = async (ctx,next)=>{
    ctx.render('login.html', {
        title: 'Welcome'
    });
};

var fn_login_verify = async (ctx, next) => {
    var
        email = ctx.request.body.email || '',
        passwd = ctx.request.body.password || '';
    console.log(`signin with email: ${email}, password: ${passwd}`);
    
    passport.authenticate('local',function(err,user){
        if(user){
            ctx.render('signin-ok.html', {
                title: 'Sign In OK',
                name: `Mr ${user.name}`,
            });
            return ctx.login(user);
        }
        else{
            ctx.render('signin-failed.html', {
                title: 'Sign In Failed',
            });
        }
    });
};

module.exports = {
    'GET /login_index' : fn_login_index,
    'POST /login_verify' : fn_login_verify
};