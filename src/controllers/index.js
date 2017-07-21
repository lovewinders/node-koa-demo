export function home (ctx, next) {
    ctx.state = {
        title: '首页'
    };

    ctx.body = {
        msg: 'hello world'
    }
}
