User = require('./../model/user')

var fn_signup_index = async(ctx,next)=>{
    ctx.render('signup.html', {
        title: 'Welcome Join'
    });
};


var fn_signup = async(ctx,next)=>{
    if (!ctx.request.body.email || !ctx.request.body.password || !ctx.request.body.name) {
        ctx.render('signup-failed.html', {
            title: 'signup',
            body:  'please input email & passwd & name'
        });
      } else {
        var newUser = new User({
          name:  ctx.request.name,
          email: ctx.request.body.email,
          passwd: ctx.request.body.passwd, 
        });
        newUser.save((err) => {
          if (err) {
            ctx.render('signup-failed.html', {
                title: 'signup',
                body:  'err'
            });
          }
          ctx.render('signup-ok.html', {
            title: 'SignUp OK',
          })
        });
      }
    };

module.exports = {
    'GET /sign_up' : fn_signup_index,
    'POST /sign_up': fn_signup
}