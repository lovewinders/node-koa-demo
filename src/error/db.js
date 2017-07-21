import AbstractError from './abstract'
import ResponseFactory from '../util/response'
import * as ResponseCode from '../util/code'
class DataBaseError extends AbstractError {
    constructor (msg) {
        super();
        this.state = 500;
        this.code = ResponseCode.FAILURE;
        this.message = msg || '';
        this.name = 'DataBaseError'
    }

    getRestResponse () {
        let msg = this.message;
        switch (this.message) {
        case 'SequelizeConnectionRefusedError':
            msg = '无法连接到数据库';
            break
        }
        return ResponseFactory.makeResponse(this.code, this.name + ' ' + msg)
    }
}
export default DataBaseError
