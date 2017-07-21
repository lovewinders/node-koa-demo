import koajwt from 'koa-jwt'
import jwt from 'jsonwebtoken'
import compose from 'koa-compose'
import config from '../config'
import { Role, User } from '../models'
import { DataBaseError, UnauthorizedError, ForbiddenError } from '../error'

class Auth {
    /**
     *  生成token
     */
    static signToken (user) {
        return jwt.sign(user, config.app.secrets, { expiresIn: 60 * 60 * 24 * 7 }) // 有效期7天
    }

    /**
     *  验证token
     */
    static authToken () {
        return compose([
            async (ctx, next) => {
                const referer = ctx.header.referer;
                let token = null;
                if (referer) {
                    const queryString = referer.substring(referer.indexOf('\\?'), referer.length);
                    if (queryString && queryString.indexOf('token') !== -1) { // 这里的this 不是完整的request对象，无法使用koa api获取参数
                        const array = queryString.substring(1, queryString.length).split('=');
                        const len = array.length;
                        for (let i = 0; i < len; i++) {
                            if (array[i] === 'token') {
                                token = array[i + 1];
                                break
                            }
                        }
                    }
                }

                if (token) {
                    // @todo token 过期／token 在不在数据库
                    ctx.headers.authorization = 'Bearer ' + token
                }
                await next()
            },
            koajwt({ secret: config.app.secrets, passthrough: true })
        ])
    }

    /**
     * 验证用户是否登录
     */
    static isAuthenticated () {
        return compose([
            Auth.authToken(),
            async (ctx, next) => {
                if (!ctx.state.user) {
                    throw new UnauthorizedError()
                }
                await next()
            },
            async (ctx, next) => {
                let user = null;
                try {
                    const id = ctx.state.user.id;
                    user = await User.findOne({
                        'where': {'id': id},
                        'attributes': ['id', 'username', 'nickname'],
                        'include': [{ 'model': Role, 'attributes': ['name']}]})
                } catch (err) {
                    throw new DataBaseError(err.name)
                }
                if (!user) {
                    throw new UnauthorizedError()
                }
                ctx.req.user = user.get({'plain': true});
                await next()
            }
        ])
    }

    /**
     * 验证用户权限
     */
    static hasRole (role) {
        return compose([
            Auth.isAuthenticated(),
            async (ctx, next) => {
                const user = ctx.req.user;
                const roles = user.roles;
                if (!roles || Array.indexOf(roles, role) === -1) {
                    throw new ForbiddenError(user.usesrname)
                } else {
                    await next()
                }
            }
        ])
    }

    /**
    *   超级管理员
    */
    static isSuperadmin (user) {
        let falg = false;
        if (user) {
            for (let role of user.roles) {
                if (role.name === 'superadmin') {
                    falg = true;
                    break
                }
            }
        }
        return falg
    }
}

export default Auth