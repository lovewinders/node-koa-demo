import Validation from '../util/validation'
import Auth from '../middleware/auth'
import {User, Role} from '../models'
import ResponseFactory from '../util/response'
import * as ResponseCode from '../util/code'
import {InvalidParametersError, DataBaseError} from '../error'

export async function token (ctx, next) {
    const {username, password} = ctx.request.body;
    if (!Validation.validateUsername(username)) {
        throw new InvalidParametersError(`username:[${username}]`)
    }
    if (!Validation.validatePassword(password)) {
        throw new InvalidParametersError('password')
    }

    let user = null;
    try {
        user = await User.findOne({
            'where': {'username': username, 'password': password},
            'attributes': ['id', 'username', 'nickname'],
            'include': [{'model': Role, 'attributes': ['name']}]
        })
    } catch (err) {
        throw new DataBaseError(err.name)
    }
    if (user) {
        let json = user.get({'plain': true});
        const token = Auth.signToken(json);
        ctx.body = ResponseFactory.makeResponse({token})
    } else {
        ctx.status = 403;
        ctx.body = ResponseFactory.makeResponse(ResponseCode.FAILURE, '账号或密码错误!')
    }
}

export async function login (ctx, next) {
    console.log(ctx);
    ctx.body = {
        login: true
    }
}
