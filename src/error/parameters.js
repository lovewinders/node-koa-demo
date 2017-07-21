import AbstractError from './abstract'
import ResponseFactory from '../util/response'
import * as ResponseCode from '../util/code'

class InvalidParametersError extends AbstractError {
    constructor (msg) {
        super()
        this.state = 412
        this.code = ResponseCode.FAILURE
        this.message = msg || ''
        this.name = 'InvalidParametersError'
    }

    getRestResponse () {
        return ResponseFactory.makeResponse(this.code, this.name + ' ' + this.message)
    }
}
export default InvalidParametersError
