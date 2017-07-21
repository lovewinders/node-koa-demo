import * as ResponseCode from './code'

class ResponseFactory {
    static makeResponse (code, msg, result) {
        if (result === undefined && msg === undefined && typeof code === 'object') {
            result = code
            code = 0
        }
        msg = msg || ''
        const message = ResponseFactory.getMsg(code) + msg
        return {code, message, result}
    }

    static getMsg (code) {
        switch (code) {
        case ResponseCode.FAILURE:
            return 'Failure '
        case ResponseCode.SUCCESS :
            return 'Success'
        default :
            return 'Failure '
        }
    }
}

export default ResponseFactory
