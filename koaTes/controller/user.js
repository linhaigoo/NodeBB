var fn_user_index = async (ctx, next) => {
    ctx.render('me.html', {
        title: 'Welcome'
    });
};

module.exports = {
    'GET /user_index': fn_user_index,
};