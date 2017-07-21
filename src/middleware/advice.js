import { AbstractError, UnauthorizedError } from '../error'

export default async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        if (err instanceof UnauthorizedError) {
            ctx.status = err.state;
            ctx.body = err.getRestResponse()
        } else if (err instanceof AbstractError) {
            ctx.status = err.state;
            ctx.body = err.getRestResponse()
        } else {
            ctx.status = 500;
            ctx.body = {code: -1, message: '服务器异常'};
            ctx.app.emit('error', err, ctx)
        }
    }
}
