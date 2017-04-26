module.exports = {
    'GET /': async (ctx, next) => {
        let shell = 1212121;
        let data = '';

        ctx.render('index.html', {
            code: data,
            value: shell
        });
    }
}

