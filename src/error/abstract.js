import util from 'util'
import * as ResponseCode from '../util/code'
import ResponseFactory from '../util/response'

class AbstractError {
    constructor (msg) {
        this.state = 500;
        this.name = 'AbstractError';
        this.code = ResponseCode.FAILURE;
        this.message = msg || 'AbstractError';
        Error.captureStackTrace(this, this)
    }

    getRestResponse () {
        return ResponseFactory.makeResponse(this.code, this.name + ' ' + this.message)
    }
}
util.inherits(AbstractError, Error);

export default AbstractError
